import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/sessionOptions";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ user: null });
  }
}, sessionOptions);
