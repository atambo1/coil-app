import React, { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import axios from "axios";

export default function EntryGate() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await await axios.post("/api/create-user", { email, nickname });

      // Redirect or show next step
      window.location.href = "/walk"; // or whatever route continues the journey
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Stack spacing={2} maxWidth="400px" mx="auto" mt={10}>
      <Typography variant="h4" align="center">Enter the Coil</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Begin
      </Button>
    </Stack>
  );
}
