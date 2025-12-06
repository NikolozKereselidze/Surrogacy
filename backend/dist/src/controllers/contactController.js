import { sendContactEmail, sendAutoReply } from "../services/mailService.js";
import { z } from "zod";
const contactSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(100, "First name must be less than 100 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(100, "Last name must be less than 100 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
    email: z
        .string()
        .email("Please enter a valid email address")
        .max(255, "Email must be less than 255 characters"),
    phone: z
        .string()
        .max(50, "Phone number must be less than 50 characters")
        .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
        .optional()
        .or(z.literal("")),
    gender: z
        .enum(["male", "female", "other"], "Please select one option")
        .optional(),
    subject: z
        .enum([
        "surrogate",
        "egg-donor",
        "intended-parent",
        "sperm-donor",
        "general-inquiry",
    ], "Please select one option")
        .optional(),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(5000, "Message must be less than 5000 characters"),
    // Honeypot field - should be empty
    website: z
        .string()
        .max(0, "This field should be empty")
        .optional()
        .or(z.literal("")),
});
export async function submitContact(req, res) {
    try {
        // Validate the request body
        const validationResult = contactSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: validationResult.error.format(),
            });
        }
        const { firstName, lastName, email, phone, gender, subject, message, website, } = validationResult.data;
        // Check honeypot (spam protection)
        if (website && website.trim().length > 0) {
            // Silently reject spam submissions
            return res
                .status(200)
                .json({ message: "Contact form submitted successfully" });
        }
        await sendContactEmail({
            firstName,
            lastName,
            email,
            phone,
            gender,
            subject,
            message,
        });
        // Send auto-reply to the user
        await sendAutoReply({
            toEmail: email,
            toName: firstName,
        });
        res.status(200).json({ message: "Contact form submitted successfully" });
    }
    catch (err) {
        console.error("Contact form error:", err);
        res.status(500).json({
            error: "Failed to send message. Please try again later.",
        });
    }
}
