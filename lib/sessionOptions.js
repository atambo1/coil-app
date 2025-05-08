// lib/sessionOptions.js
export const sessionOptions = {
    password: process.env.SESSION_SECRET,
    cookieName: "coil.session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };