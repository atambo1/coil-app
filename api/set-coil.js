import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, coil } = req.body;
  if (!email || !coil) {
    return res.status(400).json({ error: "Missing email or coil." });
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { coil },
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Error setting coil:", err);
    res.status(500).json({ error: "Failed to update coil." });
  }
}
