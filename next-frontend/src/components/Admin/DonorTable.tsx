"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Donor, DonorUrls } from "@/types/donor";
import styles from "@/styles/Admin/AdminDashboard.module.css";

const PAGE_SIZE = 12;

interface DonorTableProps {
  donors: Donor[];
  donorUrls: Record<string, DonorUrls>;
  onEdit: (donor: Donor) => void;
  onDelete: (id: string) => void;
}

function profileCode(id: string) {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export default function DonorTable({ donors, donorUrls, onEdit, onDelete }: DonorTableProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredDonors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return donors;
    return donors.filter((donor) => {
      const profile = donor.databaseUser;
      return [profileCode(donor.id), profile.age, profile.height, profile.weight, profile.hairColor, profile.eyeColor]
        .some((value) => String(value ?? "").toLowerCase().includes(normalized));
    });
  }, [donors, query]);

  const totalPages = Math.max(1, Math.ceil(filteredDonors.length / PAGE_SIZE));
  const visibleDonors = filteredDonors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query, donors]);

  return (
    <section className={styles.dataSection}>
      <div className={styles.tableToolbar}>
        <div><h2>Profiles</h2><p>{filteredDonors.length} {filteredDonors.length === 1 ? "record" : "records"}</p></div>
        <label className={styles.tableSearch}>
          <span className={styles.visuallyHidden}>Search profiles</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ID or profile details…" />
        </label>
      </div>

      <div className={styles.blogTable}>
        <table>
          <thead><tr><th>Profile</th><th>Age</th><th>Height</th><th>Weight</th><th>Status</th><th><span className={styles.visuallyHidden}>Actions</span></th></tr></thead>
          <tbody>
            {visibleDonors.map((donor) => (
              <tr key={donor.id}>
                <td><div className={styles.profileCell}>
                  {donorUrls[donor.id]?.mainImageUrl ? <Image className={styles.profileImage} src={donorUrls[donor.id].mainImageUrl || ""} alt="" width={60} height={60} /> : <span className={styles.profilePlaceholder}>HF</span>}
                  <span><strong>{profileCode(donor.id)}</strong><small>{donor.databaseUser.hairColor || "No hair color"} · {donor.databaseUser.eyeColor || "No eye color"}</small></span>
                </div></td>
                <td>{donor.databaseUser.age} years</td>
                <td>{donor.databaseUser.height} cm</td>
                <td>{donor.databaseUser.weight} kg</td>
                <td><span className={`${styles.statusBadge} ${donor.databaseUser.available ? styles.statusAvailable : styles.statusUnavailable}`}>{donor.databaseUser.available ? "Available" : "Unavailable"}</span></td>
                <td><div className={styles.actionButtons}>
                  {donorUrls[donor.id]?.documentUrl && <a href={donorUrls[donor.id].documentUrl} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} title="View document" aria-label="View document">↗</a>}
                  <button className={styles.actionBtn} onClick={() => onEdit(donor)} title="Edit" aria-label={`Edit profile ${profileCode(donor.id)}`}><FaEdit /></button>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => onDelete(donor.id)} title="Delete" aria-label={`Delete profile ${profileCode(donor.id)}`}><FaTrash /></button>
                </div></td>
              </tr>
            ))}
            {visibleDonors.length === 0 && <tr><td colSpan={6}><div className={styles.tableEmpty}><strong>No profiles found</strong><span>{query ? "Try a different search." : "Create the first profile to get started."}</span></div></td></tr>}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && <div className={styles.pagination}>
        <span>Page {page} of {totalPages}</span>
        <div><button type="button" onClick={() => setPage((current) => current - 1)} disabled={page === 1}>Previous</button><button type="button" onClick={() => setPage((current) => current + 1)} disabled={page === totalPages}>Next</button></div>
      </div>}
    </section>
  );
}
