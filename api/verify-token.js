import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { token } = req.body;

  const tokenRecord = await prisma.token.findUnique({
    where: { token },
    include: { user: true },
  });

  // Check token is valid and not expired (older than 48h)
  const tokenAgeMs = tokenRecord
    ? new Date() - new Date(tokenRecord.createdAt)
    : Infinity;

  const isExpired = tokenAgeMs > 1000 * 60 * 60 * 48;

  if (!tokenRecord || !tokenRecord.user || isExpired) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  // Delete token after use (single-use login token)
  await prisma.token.delete({
    where: { token },
  });

  // Return verified user
  res.status(200).json({ user: tokenRecord.user });
}
