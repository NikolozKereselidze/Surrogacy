import { useState, useEffect } from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { FaPlus, FaEdit, FaTrash, FaUser, FaUserPlus } from "react-icons/fa";
import { MdFamilyRestroom as MdFamilyRestroomIcon } from "react-icons/md";
import ImageCompressor from "../../components/ImageCompressor";

const CLOUDFRONT_DOMAIN = import.meta.env.VITE_CLOUDFRONT_DOMAIN;

function getImageUrl(imagePath: string) {
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}

function getDocumentUrl(documentPath: string) {
  return `${CLOUDFRONT_DOMAIN}/${documentPath}`;
}

interface DatabaseUser {
  id: string;
  height: number;
  weight: number;
  age: number;
  available: boolean;
  documentPath?: string;
  imagePath?: string;
}

interface Donor {
  id: string;
  databaseUserId: string;
  databaseUser: DatabaseUser;
  createdAt: string;
  updatedAt: string;
}

interface DonorConfig {
  title: string;
  apiEndpoint: string;
  icon: React.ReactNode;
  color: string;
}

const donorConfigs: Record<string, DonorConfig> = {
  "egg-donors": {
    title: "Egg Donors",
    apiEndpoint: "/api/egg-donors",
    icon: <FaUser />,
    color: "#6c3cff",
  },
  surrogates: {
    title: "Surrogates",
    apiEndpoint: "/api/surrogates",
    icon: <MdFamilyRestroomIcon />,
    color: "#ff6b6b",
  },
  "sperm-donors": {
    title: "Sperm Donors",
    apiEndpoint: "/api/sperm-donors",
    icon: <FaUserPlus />,
    color: "#4ecdc4",
  },
};

interface DonorManagementProps {
  donorType: string;
}

const DonorManagement = ({ donorType }: DonorManagementProps) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [donorUrls, setDonorUrls] = useState<
    Record<string, { imageUrl?: string; documentUrl?: string }>
  >({});
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    available: true,
    documentPath: "",
    imagePath: "",
  });

  const config = donorConfigs[donorType || ""];

  useEffect(() => {
    if (config) {
      fetchDonors();
    }
  }, [config]);

  const fetchDonors = async () => {
    try {
      const dataResponse = await fetch(
        `http://localhost:3000${config.apiEndpoint}`
      );
      const data = await dataResponse.json();
      setDonors(data);

      // Generate CloudFront URLs for all donors with files
      const urlsMap: Record<
        string,
        { imageUrl?: string; documentUrl?: string }
      > = {};

      for (const donor of data) {
        const donorId = donor.id;
        urlsMap[donorId] = {};

        if (donor.databaseUser?.imagePath) {
          urlsMap[donorId].imageUrl = getImageUrl(donor.databaseUser.imagePath);
        }

        if (donor.databaseUser?.documentPath) {
          urlsMap[donorId].documentUrl = getDocumentUrl(
            donor.databaseUser.documentPath
          );
        }
      }

      setDonorUrls(urlsMap);
    } catch (error) {
      console.log(error);
      console.error(`Error fetching ${config.title}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  const uploadFileToS3 = async (file: File, type: "image" | "document") => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/file?fileType=${file.type}&fileName=${file.name}&donorType=${donorType}`,
        {
          method: "POST",
        }
      );
      const { signedUrl, key } = await response.json();

      await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
      return key;
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      throw error;
    }
  };

  const deleteFileFromS3 = async (filePath: string) => {
    if (!filePath) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/file/?key=${filePath}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.error("Failed to delete file from S3");
      }
    } catch (error) {
      console.error("Error deleting file from S3:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageKey = "";
      let documentKey = "";

      // Upload files to S3 if they exist
      if (imageFile) {
        imageKey = await uploadFileToS3(imageFile, "image");
      }
      if (documentFile) {
        documentKey = await uploadFileToS3(documentFile, "document");
      }

      const url = editingDonor
        ? `http://localhost:3000${config.apiEndpoint}/${editingDonor.id}`
        : `http://localhost:3000${config.apiEndpoint}`;

      const method = editingDonor ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          height: parseInt(formData.height),
          weight: parseInt(formData.weight),
          age: parseInt(formData.age),
          imagePath: imageKey,
          documentPath: documentKey,
        }),
      });

      if (response.ok) {
        fetchDonors();
        resetForm();
      }
    } catch (error) {
      console.error(`Error saving ${config.title}:`, error);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${config.title.toLowerCase()}?`
      )
    ) {
      try {
        // Find the donor to get their file paths
        const donor = donors.find((d) => d.id === id);

        if (donor) {
          // Delete associated files from S3
          if (donor.databaseUser.imagePath) {
            await deleteFileFromS3(donor.databaseUser.imagePath);
          }
          if (donor.databaseUser.documentPath) {
            await deleteFileFromS3(donor.databaseUser.documentPath);
          }
        }

        // Delete the donor record from database
        const response = await fetch(
          `http://localhost:3000${config.apiEndpoint}/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchDonors();
        }
      } catch (error) {
        console.error(`Error deleting ${config.title}:`, error);
      }
    }
  };

  const handleEdit = (donor: Donor) => {
    setEditingDonor(donor);
    setFormData({
      height: donor.databaseUser.height.toString(),
      weight: donor.databaseUser.weight.toString(),
      age: donor.databaseUser.age.toString(),
      available: donor.databaseUser.available,
      documentPath: donor.databaseUser.documentPath || "",
      imagePath: donor.databaseUser.imagePath || "",
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      height: "",
      weight: "",
      age: "",
      available: true,
      documentPath: "",
      imagePath: "",
    });
    setEditingDonor(null);
    setShowAddForm(false);
  };

  if (!config) {
    return <div className={styles.loading}>Invalid donor type</div>;
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContent}>
      <div className={styles.pageHeader}>
        <h1 style={{ color: config.color }}>
          {config.icon} {config.title} Management
        </h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
          style={{ background: config.color }}
        >
          <FaPlus /> Add New {config.title.slice(0, -1)}
        </button>
      </div>

      {showAddForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <h2>
              {editingDonor
                ? `Edit ${config.title.slice(0, -1)}`
                : `Add New ${config.title.slice(0, -1)}`}
            </h2>
            <form onSubmit={handleSubmit} className={styles.blogForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    placeholder="e.g., 28"
                    min="18"
                    max="50"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                    placeholder="e.g., 165"
                    min="140"
                    max="200"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    placeholder="e.g., 60"
                    min="30"
                    max="220"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="available">Available</label>
                  <select
                    id="available"
                    value={formData.available.toString()}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        available: e.target.value === "true",
                      })
                    }
                    required
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="document">Document</label>
                  <input
                    id="document"
                    type="file"
                    onChange={handleDocumentChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <ImageCompressor
                    onCompressed={handleImageChange}
                    label="Choose Profile Image"
                    maxWidth={1200}
                    maxHeight={800}
                    quality={0.9}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  style={{ background: config.color }}
                >
                  {editingDonor ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.blogTable}>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Age</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {donorUrls[donor.id]?.imageUrl && (
                      <img
                        src={donorUrls[donor.id].imageUrl}
                        alt="Profile"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </td>
                <td>{donor.databaseUser.age}</td>
                <td>{donor.databaseUser.height} cm</td>
                <td>{donor.databaseUser.weight} kg</td>
                <td>
                  <span
                    style={{
                      color: donor.databaseUser.available ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {donor.databaseUser.available ? "Yes" : "No"}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    {donorUrls[donor.id]?.documentUrl && (
                      <a
                        href={donorUrls[donor.id].documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionBtn}
                        title="View Document"
                        style={{ textDecoration: "none" }}
                      >
                        📄
                      </a>
                    )}
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleEdit(donor)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => handleDelete(donor.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorManagement;
