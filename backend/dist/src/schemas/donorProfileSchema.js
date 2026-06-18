import { z } from "zod";
const donorProfileFields = {
    height: z.coerce
        .number()
        .int("Height must be a whole number")
        .min(140, "Height must be at least 140 cm")
        .max(200, "Height must be at most 200 cm"),
    weight: z.coerce
        .number()
        .int("Weight must be a whole number")
        .min(30, "Weight must be at least 30 kg")
        .max(220, "Weight must be at most 220 kg"),
    age: z.coerce
        .number()
        .int("Age must be a whole number")
        .min(18, "Age must be at least 18")
        .max(50, "Age must be at most 50"),
    available: z.coerce.boolean(),
    hairColor: z.string().min(1, "Hair color is required").max(100),
    eyeColor: z.string().min(1, "Eye color is required").max(100),
    relationshipStatus: z
        .string()
        .min(1, "Relationship status is required")
        .max(100),
    livingSituation: z.string().min(1, "Living situation is required").max(100),
    children: z.string().max(500).optional(),
    documentPath: z.string().max(500).optional(),
    mainImagePath: z.string().max(500).optional(),
    secondaryImages: z.array(z.string().min(1)).optional(),
};
export const createDonorProfileSchema = z.object({
    ...donorProfileFields,
    available: donorProfileFields.available.default(true),
    secondaryImages: donorProfileFields.secondaryImages.default([]),
});
export const updateDonorProfileSchema = z.object(donorProfileFields).partial();
export function validationErrorResponse(error) {
    return {
        error: "Validation failed",
        details: error.format(),
    };
}
