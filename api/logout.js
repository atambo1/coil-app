import { getIronSession } from "iron-session";
import { sessionOptions } from "../../lib/sessionOptions";

export default getIronSession(async function handler(req, res) {
  req.session.destroy();
  res.status(200).json({ ok: true });
}, sessionOptions);
