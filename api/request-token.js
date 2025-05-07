import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();
const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email } = req.body;

  const token = randomUUID();

  await prisma.user.upsert({
    where: { email },
    update: { token, tokenExpires: new Date(Date.now() + 15 * 60 * 1000) }, // 15 min
    create: { email, token, tokenExpires: new Date(Date.now() + 15 * 60 * 1000) },
  });

  const url = `${BASE_URL}/auth?token=${token}`;

  // Example SMTP (replace with your provider)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your link to Enter the Coil",
    text: `Click this link to continue: ${url}`,
  });

  res.status(200).json({ sent: true });
}
