import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/sessionOptions";

export default withIronSessionApiRoute(async function handler(req, res) {
  try {
    const { user } = req.body;

    console.log("Received user for session:", user);

    if (!user?.email) {
      console.error("User object missing email");
      return res.status(400).json({ error: "Missing user" });
    }

    req.session.user = user;
    await req.session.save();

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("🔥 set-session error:", err);
    res.status(500).json({ error: { code: "500", message: "A server error has occurred" } });
  }
}, sessionOptions);
