import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/sessionOptions.js"; // double-check extension if using ESM

export default withIronSessionApiRoute(async function handler(req, res) {
  try {
    const { user } = req.body;

    console.log("🧪 Received user:", user);

    if (!user?.email) {
      console.warn("⚠️ Missing user email");
      return res.status(400).json({ error: "Missing user" });
    }

    req.session.user = user;
    await req.session.save();

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("🔥 Error in /api/set-session:", err);
    res.status(500).json({ error: "Session storage failed." });
  }
}, sessionOptions);
