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

interface Filters {
  ageRange: [number, number];
  heightRange: [number, number];
  weightRange: [number, number];
  available: boolean | null;
}

interface SortOption {
  field: "age" | "height" | "weight";
  direction: "asc" | "desc";
}

const Donors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [donorId: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [selectedDonorType, setSelectedDonorType] = useState("egg-donors");
  const [filters, setFilters] = useState<Filters>({
    ageRange: [18, 60],
    heightRange: [140, 220],
    weightRange: [30, 120],
    available: null,
  });
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "age",
    direction: "asc",
  });
  const [showFilters, setShowFilters] = useState(false);
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
      setFilteredDonors(data); // Initially show all donors

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

  // Filter and sort donors
  const applyFiltersAndSort = (donorsToFilter: Donor[]) => {
    const filtered = donorsToFilter.filter((donor) => {
      const { age, height, weight, available } = donor.databaseUser;

      // Age filter
      if (age < filters.ageRange[0] || age > filters.ageRange[1]) return false;

      // Height filter
      if (height < filters.heightRange[0] || height > filters.heightRange[1])
        return false;

      // Weight filter
      if (weight < filters.weightRange[0] || weight > filters.weightRange[1])
        return false;

      // Availability filter
      if (filters.available !== null && available !== filters.available)
        return false;

      return true;
    });

    // Sort donors
    filtered.sort((a, b) => {
      const aValue = a.databaseUser[sortOption.field];
      const bValue = b.databaseUser[sortOption.field];

      if (sortOption.direction === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  };

  // Apply filters and sort when filters or sort options change
  useEffect(() => {
    const filtered = applyFiltersAndSort(donors);
    setFilteredDonors(filtered);
  }, [filters, sortOption, donors]);

  const handleDonorTypeChange = (donorType: string) => {
    setSelectedDonorType(donorType);
    setImageUrls({}); // Clear previous images
    setDonors([]); // Clear previous donors
    setFilteredDonors([]); // Clear filtered donors

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

      {/* Filters and Sort Section */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersHeader}>
          <button
            className={styles.filterToggleButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide" : "Show"} Filters & Sort
          </button>
          <div className={styles.sortContainer}>
            <select
              value={`${sortOption.field}-${sortOption.direction}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split("-") as [
                  SortOption["field"],
                  SortOption["direction"]
                ];
                setSortOption({ field, direction });
              }}
              className={styles.sortSelect}
            >
              <option value="age-asc">Age (Low to High)</option>
              <option value="age-desc">Age (High to Low)</option>
              <option value="height-asc">Height (Low to High)</option>
              <option value="height-desc">Height (High to Low)</option>
              <option value="weight-asc">Weight (Low to High)</option>
              <option value="weight-desc">Weight (High to Low)</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filtersContainer}>
            <div className={styles.filterGroup}>
              <label>
                Age Range: {filters.ageRange[0]} - {filters.ageRange[1]} years
              </label>
              <div className={styles.rangeInputs}>
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={filters.ageRange[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      ageRange: [parseInt(e.target.value), prev.ageRange[1]],
                    }))
                  }
                />
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={filters.ageRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      ageRange: [prev.ageRange[0], parseInt(e.target.value)],
                    }))
                  }
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>
                Height Range: {filters.heightRange[0]} -{" "}
                {filters.heightRange[1]} cm
              </label>
              <div className={styles.rangeInputs}>
                <input
                  type="range"
                  min="140"
                  max="200"
                  value={filters.heightRange[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      heightRange: [
                        parseInt(e.target.value),
                        prev.heightRange[1],
                      ],
                    }))
                  }
                />
                <input
                  type="range"
                  min="140"
                  max="200"
                  value={filters.heightRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      heightRange: [
                        prev.heightRange[0],
                        parseInt(e.target.value),
                      ],
                    }))
                  }
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>
                Weight Range: {filters.weightRange[0]} -{" "}
                {filters.weightRange[1]} kg
              </label>
              <div className={styles.rangeInputs}>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={filters.weightRange[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      weightRange: [
                        parseInt(e.target.value),
                        prev.weightRange[1],
                      ],
                    }))
                  }
                />
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={filters.weightRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      weightRange: [
                        prev.weightRange[0],
                        parseInt(e.target.value),
                      ],
                    }))
                  }
                />
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Availability:</label>
              <select
                value={
                  filters.available === null
                    ? "all"
                    : filters.available.toString()
                }
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    available:
                      e.target.value === "all"
                        ? null
                        : e.target.value === "true",
                  }))
                }
                className={styles.availabilitySelect}
              >
                <option value="all">All</option>
                <option value="true">Available Only</option>
                <option value="false">Not Available</option>
              </select>
            </div>

            <button
              className={styles.resetFiltersButton}
              onClick={() =>
                setFilters({
                  ageRange: [18, 50],
                  heightRange: [140, 200],
                  weightRange: [40, 120],
                  available: null,
                })
              }
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className={styles.donorsGrid}>
        {filteredDonors.length === 0 ? (
          <div className={styles.noDonorsMessage}>
            <p>
              {donors.length === 0
                ? `No ${getDonorTypeLabel(
                    selectedDonorType
                  ).toLowerCase()} available at the moment.`
                : `No ${getDonorTypeLabel(
                    selectedDonorType
                  ).toLowerCase()} match your current filters.`}
            </p>
            <p>
              {donors.length === 0
                ? "Please check back later or contact us for more information."
                : "Try adjusting your filters or reset them to see all available donors."}
            </p>
          </div>
        ) : (
          filteredDonors.map((donor) => (
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
