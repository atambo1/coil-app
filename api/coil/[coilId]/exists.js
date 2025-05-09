import { prisma } from "../../../lib/prisma.js";

export default async function handler(req, res) {
  const { coilId } = req.query;

  const coil = await prisma.coil.findUnique({
    where: { slug: coilId },
    select: { id: true },
  });

  res.status(200).json({ exists: !!coil });
}
