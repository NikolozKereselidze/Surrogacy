"use client";

import { useState } from "react";
import { FaPlus, FaUser, FaUserPlus } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { useDonorManagement } from "@/hooks/useDonorManagement";
import { deleteFileFromS3 } from "@/services/fileService";
import { donorConfigs } from "@/config/donorConfigs";
import { Donor } from "@/types/donor";
import DonorForm from "./DonorForm";
import DonorTable from "./DonorTable";
import styles from "@/styles/Admin/AdminDashboard.module.css";

interface DonorManagementProps {
  donorType: string;
}

const DonorManagement = ({ donorType }: DonorManagementProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

  const config = donorConfigs[donorType || ""];
  const { donors, loading, donorUrls, fetchDonors, deleteDonor } =
    useDonorManagement(config?.apiEndpoint || "");

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "FaUser":
        return <FaUser />;
      case "FaUserPlus":
        return <FaUserPlus />;
      case "MdFamilyRestroom":
        return <MdFamilyRestroom />;
      default:
        return <FaUser />;
    }
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      const url = editingDonor
        ? `http://localhost:3000${config.apiEndpoint}/${editingDonor.id}`
        : `http://localhost:3000${config.apiEndpoint}`;

      const method = editingDonor ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
          if (donor.databaseUser.mainImagePath) {
            await deleteFileFromS3(donor.databaseUser.mainImagePath);
          }
          if (donor.databaseUser.documentPath) {
            await deleteFileFromS3(donor.databaseUser.documentPath);
          }
          // Delete secondary images
          if (donor.databaseUser.donorImages) {
          for (const image of donor.databaseUser.donorImages) {
            await deleteFileFromS3(image.imagePath);
          }
        }
        }

        await deleteDonor(id);
      } catch (error) {
        console.error(`Error deleting ${config.title}:`, error);
      }
    }
  };

  const handleEdit = (donor: Donor) => {
    setEditingDonor(donor);
    setShowAddForm(true);
  };

  const resetForm = () => {
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
          {getIconComponent(config.iconComponent)} {config.title} Management
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
        <DonorForm
          donorType={donorType}
          config={config}
          editingDonor={editingDonor}
          donorUrls={donorUrls}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      <DonorTable
        donors={donors}
        donorUrls={donorUrls}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DonorManagement;
