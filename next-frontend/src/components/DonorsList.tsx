"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "@/styles/Donors.module.css";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

interface Donor {
  id: string;
  databaseUser: {
    height: number;
    weight: number;
    age: number;
    available: boolean;
    mainImagePath?: string;
    hairColor?: string;
    eyeColor?: string;
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

const initialFilters: Filters = {
  ageRange: [18, 50],
  heightRange: [140, 200],
  weightRange: [30, 220],
  available: null,
};

const directoryCopy = {
  "egg-donors": {
    eyebrow: "Private egg donor directory",
    description:
      "Explore carefully documented profiles and compare the details that matter to your family-building journey.",
    singular: "Egg donor",
  },
  "surrogate-donors": {
    eyebrow: "Private surrogate directory",
    description:
      "Review available surrogate profiles in a calm, confidential space designed to support considered decisions.",
    singular: "Surrogate",
  },
  "sperm-donors": {
    eyebrow: "Private sperm donor directory",
    description:
      "Browse screened donor profiles and compare essential characteristics with clarity and confidence.",
    singular: "Sperm donor",
  },
} as const;

function getImageUrl(imagePath?: string) {
  if (!imagePath || !CLOUDFRONT_DOMAIN) return null;
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}

function profileCode(id: string) {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export default function DonorsList({ donorType, title, apiEndpoint }: DonorsListProps) {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>({ field: "age", direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const copy = directoryCopy[donorType];

  const fetchDonors = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(apiEndpoint, { credentials: "include" });
      if (!response.ok) throw new Error("Unable to load profiles");
      const data: unknown = await response.json();
      if (!Array.isArray(data)) throw new Error("Unexpected profile response");
      setDonors(data as Donor[]);
    } catch (fetchError) {
      console.error(fetchError);
      setError("We couldn’t load these profiles right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  const filteredDonors = useMemo(() => {
    return donors
      .filter(({ databaseUser }) => {
        const { age, height, weight, available } = databaseUser;
        return (
          age >= filters.ageRange[0] && age <= filters.ageRange[1] &&
          height >= filters.heightRange[0] && height <= filters.heightRange[1] &&
          weight >= filters.weightRange[0] && weight <= filters.weightRange[1] &&
          (filters.available === null || available === filters.available)
        );
      })
      .sort((a, b) => {
        const difference = a.databaseUser[sortOption.field] - b.databaseUser[sortOption.field];
        return sortOption.direction === "asc" ? difference : -difference;
      });
  }, [donors, filters, sortOption]);

  const activeFilterCount = [
    filters.ageRange[0] !== initialFilters.ageRange[0] || filters.ageRange[1] !== initialFilters.ageRange[1],
    filters.heightRange[0] !== initialFilters.heightRange[0] || filters.heightRange[1] !== initialFilters.heightRange[1],
    filters.weightRange[0] !== initialFilters.weightRange[0] || filters.weightRange[1] !== initialFilters.weightRange[1],
    filters.available !== null,
  ].filter(Boolean).length;

  const clearFilter = (filter: "age" | "height" | "weight" | "availability") => {
    setFilters((current) => {
      if (filter === "age") return { ...current, ageRange: initialFilters.ageRange };
      if (filter === "height") return { ...current, heightRange: initialFilters.heightRange };
      if (filter === "weight") return { ...current, weightRange: initialFilters.weightRange };
      return { ...current, available: null };
    });
  };

  return (
    <main className={styles.directoryPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h1>{title}</h1>
          <p>{copy.description}</p>
          <div className={styles.heroTrust}>
            <span><i aria-hidden="true">✓</i> Confidential access</span>
            <span><i aria-hidden="true">✓</i> Detailed profiles</span>
            <span><i aria-hidden="true">✓</i> Dedicated support</span>
          </div>
        </div>
      </section>

      <section className={styles.directoryContent}>
        <div className={styles.toolbar}>
          <div className={styles.resultSummary}>
            <span className={styles.resultCount}>{filteredDonors.length}</span>
            <span>{filteredDonors.length === 1 ? "profile" : "profiles"} found</span>
          </div>
          <div className={styles.toolbarActions}>
            <button type="button" className={`${styles.filterToggleButton} ${showFilters ? styles.filterToggleActive : ""}`} onClick={() => setShowFilters((visible) => !visible)} aria-expanded={showFilters}>
              {showFilters ? "Hide filters" : "Filter profiles"}
              {activeFilterCount > 0 && <span className={styles.filterCount}>{activeFilterCount}</span>}
            </button>
            <label className={styles.sortContainer}>
              <span>Sort by</span>
              <select value={`${sortOption.field}-${sortOption.direction}`} onChange={(event) => {
                const [field, direction] = event.target.value.split("-") as [SortOption["field"], SortOption["direction"]];
                setSortOption({ field, direction });
              }} className={styles.sortSelect}>
                <option value="age-asc">Age: low to high</option>
                <option value="age-desc">Age: high to low</option>
                <option value="height-asc">Height: low to high</option>
                <option value="height-desc">Height: high to low</option>
                <option value="weight-asc">Weight: low to high</option>
                <option value="weight-desc">Weight: high to low</option>
              </select>
            </label>
          </div>
        </div>

        {showFilters && (
          <div className={styles.filtersPanel}>
            <div className={styles.filtersPanelHeader}>
              <div><h2>Refine profiles</h2><p>Set only the preferences that matter to you.</p></div>
              <button type="button" className={styles.resetFiltersButton} onClick={() => setFilters(initialFilters)} disabled={activeFilterCount === 0}>Clear all</button>
            </div>
            <div className={styles.filterFields}>
              <RangeField label="Age" unit="years" min={18} max={50} value={filters.ageRange} onChange={(value) => setFilters((current) => ({ ...current, ageRange: value }))} />
              <RangeField label="Height" unit="cm" min={140} max={200} value={filters.heightRange} onChange={(value) => setFilters((current) => ({ ...current, heightRange: value }))} />
              <RangeField label="Weight" unit="kg" min={30} max={220} value={filters.weightRange} onChange={(value) => setFilters((current) => ({ ...current, weightRange: value }))} />
              <fieldset className={styles.availabilityGroup}>
                <legend>Availability</legend>
                <div className={styles.segmentedControl}>
                  {([
                    { label: "All", value: null },
                    { label: "Available", value: true },
                    { label: "Unavailable", value: false },
                  ] as const).map((option) => (
                    <button key={option.label} type="button" className={filters.available === option.value ? styles.selectedSegment : ""} onClick={() => setFilters((current) => ({ ...current, available: option.value }))} aria-pressed={filters.available === option.value}>
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        )}

        {activeFilterCount > 0 && (
          <div className={styles.activeFilters} aria-label="Active filters">
            <span>Active filters</span>
            {(filters.ageRange[0] !== initialFilters.ageRange[0] || filters.ageRange[1] !== initialFilters.ageRange[1]) && (
              <button type="button" onClick={() => clearFilter("age")}>Age {filters.ageRange[0]}–{filters.ageRange[1]} <b aria-hidden="true">×</b></button>
            )}
            {(filters.heightRange[0] !== initialFilters.heightRange[0] || filters.heightRange[1] !== initialFilters.heightRange[1]) && (
              <button type="button" onClick={() => clearFilter("height")}>Height {filters.heightRange[0]}–{filters.heightRange[1]} cm <b aria-hidden="true">×</b></button>
            )}
            {(filters.weightRange[0] !== initialFilters.weightRange[0] || filters.weightRange[1] !== initialFilters.weightRange[1]) && (
              <button type="button" onClick={() => clearFilter("weight")}>Weight {filters.weightRange[0]}–{filters.weightRange[1]} kg <b aria-hidden="true">×</b></button>
            )}
            {filters.available !== null && (
              <button type="button" onClick={() => clearFilter("availability")}>{filters.available ? "Available now" : "Unavailable"} <b aria-hidden="true">×</b></button>
            )}
          </div>
        )}

        {loading ? (
          <div className={styles.loadingState}><LoadingSpinner size="large" /></div>
        ) : error ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">!</span>
            <h2>Profiles unavailable</h2><p>{error}</p>
            <button type="button" onClick={fetchDonors}>Try again</button>
          </div>
        ) : filteredDonors.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon} aria-hidden="true">⌕</span>
            <h2>No matching profiles</h2><p>Adjust or reset your filters to explore more options.</p>
            <button type="button" onClick={() => setFilters(initialFilters)}>Reset filters</button>
          </div>
        ) : (
          <div className={styles.donorsGrid}>
            {filteredDonors.map((donor) => {
              const imageUrl = getImageUrl(donor.databaseUser.mainImagePath);
              return (
                <article className={styles.donorCard} key={donor.id}>
                  <Link className={styles.cardImageLink} href={`/${donorType}/${donor.id}`} aria-label={`View ${copy.singular.toLowerCase()} profile ${profileCode(donor.id)}`}>
                    <div className={styles.donorImageContainer}>
                      {imageUrl ? (
                        <Image className={styles.donorImage} src={imageUrl} alt={`${copy.singular} profile`} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                      ) : (
                        <div className={styles.imagePlaceholder} aria-hidden="true"><span>HF</span></div>
                      )}
                      <span className={`${styles.availabilityBadge} ${donor.databaseUser.available ? styles.available : styles.unavailable}`}>
                        {donor.databaseUser.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </Link>
                  <div className={styles.cardBody}>
                    <div className={styles.cardHeading}>
                      <div><span className={styles.profileLabel}>{copy.singular}</span><h2>Profile {profileCode(donor.id)}</h2></div>
                      <span className={styles.agePill}>{donor.databaseUser.age} yrs</span>
                    </div>
                    <dl className={styles.profileFacts}>
                      <div><dt>Height</dt><dd>{donor.databaseUser.height} cm</dd></div>
                      <div><dt>Weight</dt><dd>{donor.databaseUser.weight} kg</dd></div>
                      <div><dt>Hair</dt><dd>{donor.databaseUser.hairColor || "—"}</dd></div>
                      <div><dt>Eyes</dt><dd>{donor.databaseUser.eyeColor || "—"}</dd></div>
                    </dl>
                    <Link className={styles.profileLink} href={`/${donorType}/${donor.id}`}>Explore profile <span aria-hidden="true">→</span></Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function RangeField({ label, unit, min, max, value, onChange }: {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const [fromDraft, setFromDraft] = useState(String(value[0]));
  const [toDraft, setToDraft] = useState(String(value[1]));

  useEffect(() => {
    setFromDraft(String(value[0]));
    setToDraft(String(value[1]));
  }, [value]);

  const commitFrom = () => {
    const parsed = Number.parseInt(fromDraft, 10);
    const nextValue = Number.isNaN(parsed)
      ? value[0]
      : Math.max(min, Math.min(parsed, value[1]));
    setFromDraft(String(nextValue));
    if (nextValue !== value[0]) onChange([nextValue, value[1]]);
  };

  const commitTo = () => {
    const parsed = Number.parseInt(toDraft, 10);
    const nextValue = Number.isNaN(parsed)
      ? value[1]
      : Math.min(max, Math.max(parsed, value[0]));
    setToDraft(String(nextValue));
    if (nextValue !== value[1]) onChange([value[0], nextValue]);
  };

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterTitle}>{label}</span>
      <div className={styles.numberRange}>
        <label><span>From</span><div><input aria-label={`Minimum ${label.toLowerCase()}`} type="number" inputMode="numeric" min={min} max={value[1]} value={fromDraft} onChange={(event) => setFromDraft(event.target.value)} onBlur={commitFrom} onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }} /><small>{unit}</small></div></label>
        <span className={styles.rangeSeparator} aria-hidden="true">—</span>
        <label><span>To</span><div><input aria-label={`Maximum ${label.toLowerCase()}`} type="number" inputMode="numeric" min={value[0]} max={max} value={toDraft} onChange={(event) => setToDraft(event.target.value)} onBlur={commitTo} onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }} /><small>{unit}</small></div></label>
      </div>
    </div>
  );
}
