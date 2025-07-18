import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/Donors.module.css";
import Button from "../components/Button";

interface Donor {
  id: string;
  databaseUser: {
    height: number;
    weight: number;
    age: number;
    available: boolean;
    documentPath: string;
    imagePath: string;
  };
}

const Donors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [donorId: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [selectedDonorType, setSelectedDonorType] = useState("egg-donors");
  const navigate = useNavigate();
  const location = useLocation();

  // Get donor type from URL or default to egg-donors
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("surrogates")) {
      setSelectedDonorType("surrogates");
    } else if (path.includes("sperm-donors")) {
      setSelectedDonorType("sperm-donors");
    } else {
      setSelectedDonorType("egg-donors");
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchDonors();
  }, [selectedDonorType]);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      switch (selectedDonorType) {
        case "surrogates":
          endpoint = "http://localhost:3000/api/surrogates";
          break;
        case "sperm-donors":
          endpoint = "http://localhost:3000/api/sperm-donors";
          break;
        default:
          endpoint = "http://localhost:3000/api/egg-donors";
          break;
      }

      const response = await fetch(endpoint);
      const data = await response.json();
      setDonors(data);

      // Fetch images for all donors
      data.forEach(async (donor: Donor) => {
        if (donor.databaseUser.imagePath) {
          await getImageUrl(donor.id, donor.databaseUser.imagePath);
        }
      });
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = async (donorId: string, imagePath: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/file?key=${imagePath}`
      );
      const data = await response.json();
      setImageUrls((prev) => ({
        ...prev,
        [donorId]: data.signedUrl,
      }));
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };

  const handleDonorTypeChange = (donorType: string) => {
    setSelectedDonorType(donorType);
    setImageUrls({}); // Clear previous images
    setDonors([]); // Clear previous donors

    // Update URL
    switch (donorType) {
      case "surrogates":
        navigate("/surrogates");
        break;
      case "sperm-donors":
        navigate("/sperm-donors");
        break;
      default:
        navigate("/find-egg-donor");
        break;
    }
  };

  const getDonorTypeLabel = (type: string) => {
    switch (type) {
      case "surrogates":
        return "Surrogates";
      case "sperm-donors":
        return "Sperm Donors";
      default:
        return "Egg Donors";
    }
  };

  const donorTypeTabs = [
    { id: "egg-donors", label: "Egg Donors", path: "/find-egg-donor" },
    { id: "surrogates", label: "Surrogates", path: "/surrogates" },
    { id: "sperm-donors", label: "Sperm Donors", path: "/sperm-donors" },
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.donorsPageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Find {getDonorTypeLabel(selectedDonorType)}
        </h1>
        <p className={styles.pageDescription}>
          Browse our carefully screened{" "}
          {getDonorTypeLabel(selectedDonorType).toLowerCase()}
          to find the perfect match for your family.
        </p>
      </div>

      <div className={styles.donorTypeTabs}>
        {donorTypeTabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              selectedDonorType === tab.id ? styles.activeTab : ""
            }`}
            onClick={() => handleDonorTypeChange(tab.id)}
            disabled={selectedDonorType === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.donorsGrid}>
        {donors.length === 0 ? (
          <div className={styles.noDonorsMessage}>
            <p>
              No {getDonorTypeLabel(selectedDonorType).toLowerCase()} available
              at the moment.
            </p>
            <p>Please check back later or contact us for more information.</p>
          </div>
        ) : (
          donors.map((donor) => (
            <div className={styles.donorCard} key={donor.id}>
              <div className={styles.donorImageContainer}>
                <img
                  className={styles.donorImage}
                  src={imageUrls[donor.id]}
                  alt={`${getDonorTypeLabel(selectedDonorType).slice(0, -1)}`}
                  loading="lazy"
                />
              </div>
              <div className={styles.donorInfoWrapper}>
                <div className={styles.donorInfoContainer}>
                  <div className={styles.donorInfo}>
                    <h3>Height:</h3>
                    <p>{donor.databaseUser.height} cm</p>
                  </div>
                  <div className={styles.donorInfo}>
                    <h3>Weight:</h3>
                    <p>{donor.databaseUser.weight} kg</p>
                  </div>
                  <div className={styles.donorInfo}>
                    <h3>Age:</h3>
                    <p>{donor.databaseUser.age}</p>
                  </div>
                  <div className={styles.donorInfo}>
                    <h3>Available:</h3>
                    <p>{donor.databaseUser.available ? "Yes" : "No"}</p>
                  </div>
                </div>

                <Button className={styles.viewProfileButton}>
                  View Profile
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Donors;
