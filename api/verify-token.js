import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { token } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      token,
      tokenExpires: { gte: new Date() },
    },
  });

  if (!user) return res.status(401).json({ error: "Invalid or expired token." });

  // Optionally clear token here
  await prisma.user.update({
    where: { email: user.email },
    data: { token: null, tokenExpires: null },
  });

  res.status(200).json({ user });
}
