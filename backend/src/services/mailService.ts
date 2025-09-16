import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: string;
  subject?: string;
  message?: string;
}) {
  try {
    const { firstName, lastName, email, phone, gender, subject, message } =
      params;

    const text = [
      `New contact form submission`,
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      gender ? `Gender: ${gender}` : "",
      subject ? `Subject: ${subject}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="color: #e0e0e0; margin: 10px 0 0 0;">Miracle Makers</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
            </tr>
            ${
              phone
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></td>
            </tr>
            `
                : ""
            }
            ${
              gender
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Gender:</td>
              <td style="padding: 8px 0;">${gender}</td>
            </tr>
            `
                : ""
            }
            ${
              subject
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 8px 0; background: #f0f8ff; border-radius: 4px; padding: 8px; color: #667eea; font-weight: bold;">${subject}</td>
            </tr>
            `
                : ""
            }
          </table>
          
          <h3 style="color: #667eea; margin: 25px 0 15px 0;">Message</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; white-space: pre-wrap; font-style: italic;">${message}</div>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            This email was sent from the Miracle Makers contact form.<br>
            Reply directly to this email to respond to ${firstName}.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `New Contact from ${firstName} ${lastName} - ${
        subject || "General Inquiry"
      }`,
      text,
      html,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function sendAutoReply(params: {
  toEmail: string;
  toName?: string;
}) {
  const { toEmail, toName } = params;

  const text = `Hi${
    toName ? " " + toName : ""
  },\n\nThanks for contacting Miracle Makers. We'll get back to you shortly.\n\nWarm regards,\nMiracle Makers`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting us</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Thank You!</h1>
        <p style="color: #e0e0e0; margin: 10px 0 0 0;">Miracle Makers</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
        <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #667eea; margin-top: 0;">Hi${
            toName ? " " + toName : ""
          },</h2>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for reaching out to Miracle Makers. We have received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our team will review your inquiry</li>
              <li>We'll match you with the appropriate specialist</li>
              <li>You'll receive a personalized response within 24 hours</li>
            </ul>
          </div>
          
          <p style="font-size: 16px;">
            If you have any urgent questions, please don't hesitate to call us directly.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="margin: 0; font-size: 18px; color: #667eea; font-weight: bold;">Warm regards,</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; color: #555;">The Miracle Makers Team</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: toEmail,
    subject: "Thank you for contacting Miracle Makers",
    text,
    html,
  });
}
