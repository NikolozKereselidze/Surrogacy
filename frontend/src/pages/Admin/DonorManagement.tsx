import { useState, useEffect } from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { FaPlus, FaEdit, FaTrash, FaUser, FaUserPlus } from "react-icons/fa";
import { MdFamilyRestroom as MdFamilyRestroomIcon } from "react-icons/md";

interface DatabaseUser {
  id: string;
  firstName: string;
  lastName: string;
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
    firstName: "",
    lastName: "",
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

      // Get URLs for all donors with files
      const urlsMap: Record<
        string,
        { imageUrl?: string; documentUrl?: string }
      > = {};

      for (const donor of data) {
        const donorId = donor.id;
        urlsMap[donorId] = {};

        if (donor.databaseUser?.imagePath) {
          const imageUrl = await getImageUrl(donor.databaseUser.imagePath);
          urlsMap[donorId].imageUrl = imageUrl || undefined;
        }

        if (donor.databaseUser?.documentPath) {
          const documentUrl = await getDocumentUrl(
            donor.databaseUser.documentPath
          );
          urlsMap[donorId].documentUrl = documentUrl || undefined;
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
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

  const getImageUrl = async (imagePath: string) => {
    if (!imagePath) return null;
    try {
      const response = await fetch(
        `http://localhost:3000/api/file/get?key=${imagePath}`
      );
      const { signedUrl } = await response.json();
      return signedUrl;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  };

  const getDocumentUrl = async (documentPath: string) => {
    if (!documentPath) return null;
    try {
      const response = await fetch(
        `http://localhost:3000/api/file/get?key=${documentPath}`
      );
      const { signedUrl } = await response.json();
      return signedUrl;
    } catch (error) {
      console.error("Error getting document URL:", error);
      return null;
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
      firstName: donor.databaseUser.firstName,
      lastName: donor.databaseUser.lastName,
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
      firstName: "",
      lastName: "",
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
                  <label>First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="e.g., Jane"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="e.g., Doe"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Age</label>
                  <input
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
                  <label>Height (cm)</label>
                  <input
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
                  <label>Weight (kg)</label>
                  <input
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
                  <label>Available</label>
                  <select
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
                  <label>Document</label>
                  <input type="file" onChange={handleDocumentChange} />
                </div>
                <div className={styles.formGroup}>
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
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
              <th>Name</th>
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
                    <span>
                      {donor.databaseUser.firstName}{" "}
                      {donor.databaseUser.lastName}
                    </span>
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
