import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";
import { prisma } from "../lib/prisma.js";
import { v4 as uuid } from "uuid";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const token = uuid();

    await prisma.user.update({
      where: { email },
      data: {
        token: {
          upsert: {
            create: {
              token,
              createdAt: new Date(),
            },
            update: {
              token,
              createdAt: new Date(),
            },
          },
        },
      },
    });

    const loginUrl = `https://www.thecoil.org/auth?token=${token}`;

    await resend.emails.send({
      from: "login@thecoil.org",
      to: email,
      subject: "Your magic link to The Coil",
      html: `
        <p>Welcome back.</p>
        <p><a href="${loginUrl}" style="background:#000;color:#fff;padding:12px 20px;border-radius:4px;text-decoration:none;">Click here to log in</a></p>
        <p>This link will expire when used or in 48 hours.</p>
      `,
    });

    return res.status(200).json({ message: "Login link sent" });
  } catch (err) {
    console.error("🔥 request-token error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
