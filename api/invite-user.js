import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";
import { prisma } from "../lib/prisma.js";
import { Resend } from "resend";
import { v4 as uuid } from "uuid";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getIronSession(req, res, sessionOptions);
  const inviter = session.user;

  if (!inviter || !inviter.id || !inviter.coilId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing name or email" });
  }

  const token = uuid();
  const inviteUrl = `https://www.thecoil.org/accept?token=${token}`;

  await prisma.invitation.create({
    data: {
      token,
      name,
      email,
      coilId: inviter.coilId,
      invitedById: inviter.id,
    },
  });

  await resend.emails.send({
    from: "invite@thecoil.org",
    to: email,
    subject: `${inviter.name || "Someone"} has invited you to The Coil`,
    html: `
      <p>Hi ${name},</p>
      <p><strong>${inviter.name || "A member"}</strong> has invited you to join the <strong>${inviter.coilId}</strong> coil on The Coil.</p>
      <p><a href="${inviteUrl}" style="background:#000;color:#fff;padding:12px 20px;border-radius:4px;text-decoration:none;">Accept Invitation</a></p>
      <p>If you weren't expecting this invitation, you can safely ignore it.</p>
    `,
  });

  res.status(200).json({ success: true });
}
