import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/sessionOptions";

export default withIronSessionApiRoute(async function handler(req, res) {
  const { user } = req.body;
  if (!user?.email) return res.status(400).json({ error: "Missing user" });

  req.session.user = user;
  await req.session.save();
  res.status(200).json({ ok: true });
}, sessionOptions);
