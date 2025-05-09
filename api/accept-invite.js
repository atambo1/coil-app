import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";
import { prisma } from "../lib/prisma.js";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Missing invite token.");
  }

  const invite = await prisma.invitation.findUnique({ where: { token } });

  if (!invite || invite.acceptedAt) {
    return res.status(400).send("Invalid or used invite.");
  }

  const user = await prisma.user.create({
    data: {
      email: invite.email,
      name: invite.name,
      coilId: invite.coilId,
      invitedById: invite.invitedById,
    },
  });

  await prisma.invitation.update({
    where: { token },
    data: { acceptedAt: new Date() },
  });

  const session = await getIronSession(req, res, sessionOptions);
  session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    coil: user.coilId,
  };
  await session.save();

  res.redirect(`/${user.coilId}`);
}
