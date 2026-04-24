/* This file sends the contact form payload to your inbox using SMTP (Nodemailer). */
import nodemailer from "nodemailer";
import type { ContactPayload } from "@/lib/contact";

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function sendContactEmail(payload: ContactPayload) {
  // We keep config in env vars so secrets never land in git.
  const host = requiredEnv("SMTP_HOST");
  const port = Number(requiredEnv("SMTP_PORT"));
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const to = requiredEnv("CONTACT_TO");
  const from = process.env.CONTACT_FROM ?? user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const subject = `[Website] ${payload.interest} — ${payload.name}`;
  const text = [
    `Interest: ${payload.interest}`,
    `Name: ${payload.name}`,
    `Company: ${payload.company ?? ""}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone ?? ""}`,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text,
  });
}

