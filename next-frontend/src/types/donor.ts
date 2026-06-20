export interface DonorImage {
    id: string;
    databaseUserId: string;
    imagePath: string;
    isMain: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface DatabaseUser {
    id: string;
    height: number;
    weight: number;
    age: number;
    available: boolean;
    hairColor?: string;
    eyeColor?: string;
    relationshipStatus?: string;
    livingSituation?: string;
    children?: string;
    documentPath?: string;
    mainImagePath?: string;
    donorImages: DonorImage[];
}
export interface Donor {
    id: string;
    databaseUserId: string;
    databaseUser: DatabaseUser;
    createdAt: string;
    updatedAt: string;
}
export interface DonorConfig {
    title: string;
    apiEndpoint: string;
    iconComponent: string;
    color: string;
}
export interface DonorUrls {
    mainImageUrl?: string;
    documentUrl?: string;
    secondaryImageUrls?: string[];
}
export interface DonorFormData {
    height: string;
    weight: string;
    age: string;
    available: boolean;
    hairColor: string;
    eyeColor: string;
    relationshipStatus: string;
    livingSituation: string;
    children: string;
    documentPath: string;
    mainImagePath: string;
    secondaryImages: string[];
}
