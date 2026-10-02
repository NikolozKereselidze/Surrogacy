import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Donor, DonorUrls, DonorImage } from "@/types/donor";
const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;
function getImageUrl(imagePath: string) {
    return `${CLOUDFRONT_DOMAIN}/${imagePath}`;
}
function getDocumentUrl(documentPath: string) {
    return `${CLOUDFRONT_DOMAIN}/${documentPath}`;
}
function isDonorList(value: unknown): value is Donor[] {
    if (!Array.isArray(value)) return false;
    return value.every((donor) => {
        if (!donor || typeof donor.id !== "string" || !donor.id || !donor.databaseUser) return false;
        const profile = donor.databaseUser;
        return [profile.age, profile.height, profile.weight].every((field) => typeof field === "number" && Number.isFinite(field))
            && typeof profile.available === "boolean"
            && [profile.hairColor, profile.eyeColor, profile.relationshipStatus, profile.livingSituation,
                profile.children, profile.mainImagePath, profile.documentPath]
                .every((field) => field == null || typeof field === "string")
            && Array.isArray(profile.donorImages)
            && profile.donorImages.every((image: unknown) => image !== null && typeof image === "object"
                && "imagePath" in image && typeof image.imagePath === "string"
                && "isMain" in image && typeof image.isMain === "boolean");
    });
}
async function responseError(response: Response, fallback: string): Promise<string> {
    const body = await response.json().catch(() => null);
    if (typeof body?.error === "string") return body.error;
    if (typeof body?.message === "string") return body.message;
    return fallback;
}
export const useDonorManagement = (apiEndpoint: string) => {
    const router = useRouter();
    const [donors, setDonors] = useState<Donor[]>([]);
    const [loading, setLoading] = useState(true);
    const [donorUrls, setDonorUrls] = useState<Record<string, DonorUrls>>({});
    const [error, setError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    const handleUnauthorizedResponse = useCallback((response: Response) => {
        if (response.status !== 401) return false;
        setDonors([]);
        setDonorUrls({});
        setHasLoaded(false);
        setError("Your session has expired. Please sign in again.");
        router.replace("/login/admin");
        return true;
    }, [router]);
    const fetchDonors = useCallback(async () => {
        if (!apiEndpoint) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError("");
        try {
            const dataResponse = await fetch(apiEndpoint);
            if (handleUnauthorizedResponse(dataResponse)) return;
            if (!dataResponse.ok) throw new Error(await responseError(dataResponse, "Could not load donor profiles. Please try again."));
            const data: unknown = await dataResponse.json();
            if (!isDonorList(data)) throw new Error("The server returned invalid donor profiles. Please try again.");
            const urlsMap: Record<string, DonorUrls> = {};
            for (const donor of data) {
                const donorId = donor.id;
                urlsMap[donorId] = {};
                if (donor.databaseUser?.mainImagePath) {
                    urlsMap[donorId].mainImageUrl = getImageUrl(donor.databaseUser.mainImagePath);
                }
                if (donor.databaseUser?.donorImages &&
                    donor.databaseUser.donorImages.length > 0) {
                    urlsMap[donorId].secondaryImageUrls = donor.databaseUser.donorImages
                        .filter((img: DonorImage) => !img.isMain)
                        .map((img: DonorImage) => getImageUrl(img.imagePath));
                }
                if (donor.databaseUser?.documentPath) {
                    urlsMap[donorId].documentUrl = getDocumentUrl(donor.databaseUser.documentPath);
                }
            }
            setDonors(data);
            setDonorUrls(urlsMap);
            setHasLoaded(true);
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Could not load donor profiles. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }, [apiEndpoint, handleUnauthorizedResponse]);
    useEffect(() => {
        fetchDonors();
    }, [fetchDonors]);
    const deleteDonor = async (id: string) => {
        setError("");
        try {
            const response = await fetch(`${apiEndpoint}/${id}`, {
                method: "DELETE",
            });
            if (handleUnauthorizedResponse(response)) return;
            if (!response.ok) throw new Error(await responseError(response, "Could not delete this donor. Please try again."));
            setDonors((current) => current.filter((donor) => donor.id !== id));
            await fetchDonors();
        }
        catch (error) {
            setError(error instanceof Error ? error.message : "Could not delete this donor. Please try again.");
        }
    };
    return {
        donors,
        loading,
        donorUrls,
        error,
        hasLoaded,
        handleUnauthorizedResponse,
        fetchDonors,
        deleteDonor,
    };
};
