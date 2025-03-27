import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, scrollIndex } = req.body;

  if (!email || typeof scrollIndex !== "number") {
    return res.status(400).json({ error: "Missing or invalid data" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { scrollIndex },
    });

    res.status(200).json({ success: true, scrollIndex: updatedUser.scrollIndex });
  } catch (err) {
    console.error("Failed to save scroll:", err);
    res.status(500).json({ error: "Server error" });
  }
}
