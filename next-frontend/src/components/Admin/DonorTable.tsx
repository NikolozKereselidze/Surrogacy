"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import { Donor, DonorUrls } from "@/types/donor";
import styles from "@/styles/Admin/AdminDashboard.module.css";

interface DonorTableProps {
  donors: Donor[];
  donorUrls: Record<string, DonorUrls>;
  onEdit: (donor: Donor) => void;
  onDelete: (id: string) => void;
}

const DonorTable = ({
  donors,
  donorUrls,
  onEdit,
  onDelete,
}: DonorTableProps) => {
  return (
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
                  {donorUrls[donor.id]?.mainImageUrl && (
                    <img
                      className={styles.profileImage}
                      src={donorUrls[donor.id].mainImageUrl}
                      alt="Profile"
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
                    onClick={() => onEdit(donor)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => onDelete(donor.id)}
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
  );
};

export default DonorTable;
