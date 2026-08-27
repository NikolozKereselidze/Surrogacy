import { z } from "zod";

export const supportedTeamLocales = ["en", "es", "ru", "he", "zh", "ka"] as const;

const optionalUrl = z.union([z.literal(""), z.string().url()]).optional();
const optionalEmail = z.union([z.literal(""), z.string().email()]).optional();

export const teamMemberTranslationSchema = z.object({
  locale: z.enum(supportedTeamLocales),
  role: z.string().trim().min(1).max(160),
  shortDescription: z.string().trim().min(1).max(600),
  longDescription: z.string().trim().min(1).max(20000),
});

export const teamMemberInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must use lowercase letters, numbers, and hyphens"),
  honorific: z.string().trim().min(1).max(40),
  name: z.string().trim().min(1).max(160),
  email: optionalEmail,
  linkedin: optionalUrl,
  imagePath: z.string().trim().min(1).max(1000),
  displayOrder: z.coerce.number().int().min(0).max(10000),
  featured: z.boolean(),
  published: z.boolean(),
  translations: z
    .array(teamMemberTranslationSchema)
    .min(1)
    .superRefine((translations, context) => {
      const locales = translations.map((translation) => translation.locale);
      if (new Set(locales).size !== locales.length) {
        context.addIssue({
          code: "custom",
          message: "Each locale may only appear once",
        });
      }
      if (!locales.includes("en")) {
        context.addIssue({
          code: "custom",
          message: "An English translation is required as the fallback",
        });
      }
    }),
});

export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>;
