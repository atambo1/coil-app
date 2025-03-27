import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, nickname } = req.body;

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { nickname },
      create: {
        email,
        nickname,
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
