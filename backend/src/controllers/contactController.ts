import { sendContactEmail, sendAutoReply } from "../services/mailService";
import { Request, Response } from "express";

export async function submitContact(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, phone, gender, subject, message } =
      req.body;

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
  } catch (err) {}
}
