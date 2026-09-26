import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please complete all fields." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) {
    return res.status(503).json({
      error: "Contact service is not configured yet. Please use the email link below."
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM,
    to: ["princewillobongha@gmail.com"],
    replyTo: email,
    subject: `Portfolio enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  });

  if (error) return res.status(502).json({ error: "Email service could not send the message." });

  return res.status(200).json({ ok: true });
}
