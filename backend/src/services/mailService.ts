import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );

const detailRow = (label: string, value: string, href?: string) => `
  <tr>
    <td style="padding: 13px 0; border-bottom: 1px solid #e8edf5; color: #718096; font-size: 13px; font-weight: 700; vertical-align: top; width: 105px;">${label}</td>
    <td style="padding: 13px 0; border-bottom: 1px solid #e8edf5; color: #172b4d; font-size: 14px; font-weight: 600; line-height: 1.5; vertical-align: top;">
      ${href ? `<a href="${href}" style="color: #1559c7; text-decoration: none;">${value}</a>` : value}
    </td>
  </tr>
`;

const emailShell = ({
  preheader,
  content,
}: {
  preheader: string;
  content: string;
}) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>Happy Family</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f6fa; color: #172b4d; font-family: Arial, Helvetica, sans-serif;">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">${preheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background-color: #f3f6fa;">
      <tr>
        <td align="center" style="padding: 32px 14px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; border-collapse: separate; background-color: #ffffff; border: 1px solid #e1e7f0; border-radius: 16px; overflow: hidden;">
            <tr>
              <td style="padding: 23px 32px; background-color: #173b75;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.3px;">Happy Family</td>
                    <td align="right" style="color: #a8dff5; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase;">Where dreams become reality</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 36px 32px 32px;">${content}</td>
            </tr>
            <tr>
              <td style="padding: 20px 32px; border-top: 1px solid #e8edf5; background-color: #f8fafc; color: #8190a5; font-size: 11px; line-height: 1.6; text-align: center;">
                Happy Family &nbsp;&bull;&nbsp; Surrogacy and egg donation support<br>
                This message was sent through ivftourgeorgia.com
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

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
      "New contact form submission",
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

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeGender = gender ? escapeHtml(gender) : "";
    const safeSubject = subject ? escapeHtml(subject) : "General inquiry";
    const safeMessage = message
      ? escapeHtml(message).replace(/\r?\n/g, "<br>")
      : "No message was provided.";

    const details = [
      detailRow("Name", `${safeFirstName} ${safeLastName}`),
      detailRow("Email", safeEmail, `mailto:${safeEmail}`),
      safePhone ? detailRow("Phone", safePhone, `tel:${safePhone}`) : "",
      safeGender ? detailRow("Gender", safeGender) : "",
      detailRow("Subject", safeSubject),
    ].join("");

    const html = emailShell({
      preheader: `New inquiry from ${safeFirstName} ${safeLastName}`,
      content: `
        <div style="margin-bottom: 12px; color: #1559c7; font-size: 11px; font-weight: 800; letter-spacing: 1.1px; text-transform: uppercase;">New website inquiry</div>
        <h1 style="margin: 0; color: #172b4d; font-size: 27px; line-height: 1.25; letter-spacing: -0.5px;">A new message from ${safeFirstName}</h1>
        <p style="margin: 10px 0 26px; color: #66758c; font-size: 14px; line-height: 1.7;">The following inquiry was submitted through the Happy Family contact form.</p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; border-collapse: collapse;">${details}</table>

        <div style="margin: 28px 0 10px; color: #172b4d; font-size: 13px; font-weight: 800;">Message</div>
        <div style="padding: 18px 20px; border-left: 3px solid #3ba6d7; background-color: #f3f8fc; color: #3f506a; font-size: 14px; line-height: 1.75;">${safeMessage}</div>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 28px;">
          <tr>
            <td style="border-radius: 9px; background-color: #1559c7;">
              <a href="mailto:${safeEmail}" style="display: inline-block; padding: 13px 20px; color: #ffffff; font-size: 13px; font-weight: 800; text-decoration: none;">Reply to ${safeFirstName}</a>
            </td>
          </tr>
        </table>
        <p style="margin: 15px 0 0; color: #8190a5; font-size: 11px; line-height: 1.6;">Replying to this email will also address your response to ${safeEmail}.</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `New contact from ${firstName} ${lastName} — ${subject || "General inquiry"}`,
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
  const greetingName = toName ? ` ${toName}` : "";
  const safeName = toName ? ` ${escapeHtml(toName)}` : "";

  const text = `Hello${greetingName},\n\nThank you for contacting Happy Family. Your message has reached our team, and we will respond within 24 hours.\n\nWarm regards,\nThe Happy Family Team`;

  const html = emailShell({
    preheader: "We received your message and will be in touch soon.",
    content: `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 22px;">
        <tr>
          <td align="center" style="width: 44px; height: 44px; border-radius: 50%; background-color: #e9f7f1; color: #19865b; font-size: 22px; font-weight: 800;">&#10003;</td>
        </tr>
      </table>
      <h1 style="margin: 0; color: #172b4d; font-size: 27px; line-height: 1.25; letter-spacing: -0.5px;">Thank you for reaching out</h1>
      <p style="margin: 12px 0 0; color: #3f506a; font-size: 15px; line-height: 1.75;">Hello${safeName},</p>
      <p style="margin: 10px 0 26px; color: #3f506a; font-size: 15px; line-height: 1.75;">Your message has reached the Happy Family team. We understand that every journey is personal, and one of our specialists will respond within 24 hours.</p>

      <div style="margin-bottom: 12px; color: #172b4d; font-size: 13px; font-weight: 800;">What happens next</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width: 100%; border-collapse: separate; border-spacing: 0 8px;">
        <tr>
          <td align="center" style="width: 34px; height: 34px; border-radius: 50%; background-color: #edf4ff; color: #1559c7; font-size: 12px; font-weight: 800;">1</td>
          <td style="padding-left: 12px; color: #3f506a; font-size: 14px; line-height: 1.55;">Our team reviews the details you shared.</td>
        </tr>
        <tr>
          <td align="center" style="width: 34px; height: 34px; border-radius: 50%; background-color: #edf4ff; color: #1559c7; font-size: 12px; font-weight: 800;">2</td>
          <td style="padding-left: 12px; color: #3f506a; font-size: 14px; line-height: 1.55;">We connect you with the appropriate specialist.</td>
        </tr>
        <tr>
          <td align="center" style="width: 34px; height: 34px; border-radius: 50%; background-color: #edf4ff; color: #1559c7; font-size: 12px; font-weight: 800;">3</td>
          <td style="padding-left: 12px; color: #3f506a; font-size: 14px; line-height: 1.55;">You receive a personal response with clear next steps.</td>
        </tr>
      </table>

      <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #e8edf5;">
        <p style="margin: 0; color: #3f506a; font-size: 14px; line-height: 1.7;">Warm regards,</p>
        <p style="margin: 3px 0 0; color: #172b4d; font-size: 14px; font-weight: 800;">The Happy Family Team</p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: toEmail,
    subject: "We received your message | Happy Family",
    text,
    html,
  });
}
