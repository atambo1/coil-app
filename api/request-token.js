import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { Resend } from "resend";

const prisma = new PrismaClient();
const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
    const { email } = req.body;
  
    try {
      const token = randomUUID();
  
      await prisma.user.upsert({
        where: { email },
        update: { token, tokenExpires: new Date(Date.now() + 15 * 60 * 1000) },
        create: { email, token, tokenExpires: new Date(Date.now() + 15 * 60 * 1000) },
      });
  
      const url = `${BASE_URL}/auth?token=${token}`;
      console.log(`Generated token URL: ${url}`);
  
      const result = await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Your link to Enter the Coil",
        html: `<p>Click to enter the Coil: <a href="${url}">${url}</a></p>`,
      });
  
      console.log("Resend response:", result);
      res.status(200).json({ sent: true });
    } catch (err) {
      console.error("Request token error:", err);
      res.status(500).json({ error: "Failed to send email." });
    }
  }
