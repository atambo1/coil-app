import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";

export default async function handler(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    const { user } = req.body;

    if (!user?.email) {
      return res.status(400).json({ error: "Missing user" });
    }

    session.user = user;
    await session.save();

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("🔥 set-session error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}