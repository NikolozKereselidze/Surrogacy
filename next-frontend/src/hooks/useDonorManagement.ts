import { useState, useEffect, useCallback } from "react";
import { Donor, DonorUrls, DonorImage } from "@/types/donor";

const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

function getImageUrl(imagePath: string) {
  return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}

function getDocumentUrl(documentPath: string) {
  return `${CLOUDFRONT_DOMAIN}/${documentPath}`;
}

export const useDonorManagement = (apiEndpoint: string) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [donorUrls, setDonorUrls] = useState<Record<string, DonorUrls>>({});

  const fetchDonors = useCallback(async () => {
    try {
      const dataResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${apiEndpoint}`);
      const data = await dataResponse.json();
      setDonors(data);

      // Generate CloudFront URLs for all donors with files
      const urlsMap: Record<string, DonorUrls> = {};

      for (const donor of data) {
        const donorId = donor.id;
        urlsMap[donorId] = {};

        if (donor.databaseUser?.mainImagePath) {
          urlsMap[donorId].mainImageUrl = getImageUrl(
            donor.databaseUser.mainImagePath
          );
        }

        // Generate URLs for secondary images
        if (
          donor.databaseUser?.donorImages &&
          donor.databaseUser.donorImages.length > 0
        ) {
          urlsMap[donorId].secondaryImageUrls = donor.databaseUser.donorImages
            .filter((img: DonorImage) => !img.isMain)
            .map((img: DonorImage) => getImageUrl(img.imagePath));
        }

        if (donor.databaseUser?.documentPath) {
          urlsMap[donorId].documentUrl = getDocumentUrl(
            donor.databaseUser.documentPath
          );
        }
      }

      setDonorUrls(urlsMap);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  const deleteDonor = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${apiEndpoint}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchDonors();
      }
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  return {
    donors,
    loading,
    donorUrls,
    fetchDonors,
    deleteDonor,
  };
};
