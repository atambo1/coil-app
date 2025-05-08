import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/sessionOptions";

export default withIronSessionApiRoute(async function handler(req, res) {
  req.session.destroy();
  res.status(200).json({ ok: true });
}, sessionOptions);
