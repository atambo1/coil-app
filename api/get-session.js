import { getIronSession } from "iron-session";
import { sessionOptions } from "../lib/sessionOptions.js";

export default async function handler(req, res) {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    res.status(200).json({ user: session.user || null });
  } catch (err) {
    console.error("🔥 get-session error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
