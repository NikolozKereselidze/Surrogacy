"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/Donors.module.css";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

function getImageUrl(imagePath: string) {
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}

interface Donor {
  id: string;
  databaseUser: {
    height: number;
    weight: number;
    age: number;
    available: boolean;
    mainImagePath: string;
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

interface DonorsListProps {
  donorType: "egg-donors" | "surrogate-donors" | "sperm-donors";
  title: string;
  apiEndpoint: string;
}

export default function DonorsList({
  donorType,
  title,
  apiEndpoint,
}: DonorsListProps) {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
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
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Tabs definition
  const donorTypeTabs = [
    { id: "egg-donors", label: "Egg Donors", path: "/find-egg-donor" },
    {
      id: "surrogate-donors",
      label: "Surrogates",
      path: "/find-surrogate-donor",
    },
    { id: "sperm-donors", label: "Sperm Donors", path: "/find-sperm-donor" },
  ];

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        setDonors(data);
        setFilteredDonors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, [apiEndpoint]);

  // Filter and sort donors
  const applyFiltersAndSort = useCallback(
    (donorsToFilter: Donor[]) => {
      const filtered = donorsToFilter.filter((donor) => {
        const { age, height, weight, available } = donor.databaseUser;
        // Age filter
        if (age < filters.ageRange[0] || age > filters.ageRange[1])
          return false;
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
    },
    [filters, sortOption]
  );

  // Apply filters and sort when filters or sort options change
  useEffect(() => {
    const filtered = applyFiltersAndSort(donors);
    setFilteredDonors(filtered);
  }, [applyFiltersAndSort, donors]);

  if (loading) return <LoadingSpinner message="Loading donors..." />;

  return (
    <div className={styles.donorsPageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>

      {/* ✅ Tabs navigation */}
      <div className={styles.donorTypeTabs}>
        {donorTypeTabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              pathname === tab.path ? styles.activeTab : ""
            }`}
            onClick={() => router.push(tab.path)}
            disabled={pathname === tab.path}
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
              id="sortSelect"
              name="sortSelect"
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
              <label htmlFor="ageRangeMin">
                Age Range: {filters.ageRange[0]} - {filters.ageRange[1]} years
              </label>
              <div className={styles.rangeInputs}>
                <input
                  id="ageRangeMin"
                  name="ageRangeMin"
                  type="range"
                  min="18"
                  max="60"
                  value={filters.ageRange[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      ageRange: [parseInt(e.target.value), prev.ageRange[1]],
                    }))
                  }
                />
                <input
                  id="ageRangeMax"
                  name="ageRangeMax"
                  type="range"
                  min="18"
                  max="60"
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
              <label htmlFor="heightRangeMin">
                Height Range: {filters.heightRange[0]} -{" "}
                {filters.heightRange[1]} cm
              </label>
              <div className={styles.rangeInputs}>
                <input
                  id="heightRangeMin"
                  name="heightRangeMin"
                  type="range"
                  min="140"
                  max="220"
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
                  id="heightRangeMax"
                  name="heightRangeMax"
                  type="range"
                  min="140"
                  max="220"
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
              <label htmlFor="weightRangeMin">
                Weight Range: {filters.weightRange[0]} -{" "}
                {filters.weightRange[1]} kg
              </label>
              <div className={styles.rangeInputs}>
                <input
                  id="weightRangeMin"
                  name="weightRangeMin"
                  type="range"
                  min="30"
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
                  id="weightRangeMax"
                  name="weightRangeMax"
                  type="range"
                  min="30"
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
              <label htmlFor="availability">Availability:</label>
              <select
                id="availability"
                name="availability"
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
                  ageRange: [18, 60],
                  heightRange: [140, 220],
                  weightRange: [30, 120],
                  available: null,
                })
              }
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ✅ Donors grid (fixed) */}
      <div className={styles.donorsGrid}>
        {filteredDonors.length === 0 ? (
          <div className={styles.noDonorsMessage}>
            <p>
              {donors.length === 0
                ? `No ${donorType.replace("-", " ")} available at the moment.`
                : `No ${donorType.replace(
                    "-",
                    " "
                  )} match your current filters.`}
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
                <Image
                  className={styles.donorImage}
                  src={getImageUrl(donor.databaseUser.mainImagePath)}
                  alt={`${donorType.slice(0, -1)}`}
                  width={138}
                  height={138}
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

                <Button
                  className={styles.viewProfileButton}
                  onClick={() => {
                    router.push(`/donor/${donor.id}`);
                  }}
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
