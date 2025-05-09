import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";
import { prisma } from "../lib/prisma.js";
import { v4 as uuid } from "uuid";

export default async function handler(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.user?.id) {
      return res.status(200).json({ user: null });
    }

    const userId = session.user.id;

    // 🔁 Refresh the user's login token
    const newToken = uuid();
    await prisma.token.upsert({
      where: { userId },
      update: { token: newToken, createdAt: new Date() },
      create: { userId, token: newToken },
    });

    // 🔐 Return session user
    res.status(200).json({ user: session.user });
  } catch (err) {
    console.error("🔥 get-session error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
