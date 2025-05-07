import React, { useState } from "react";
import { TextField, Button, Stack, Typography, Alert } from "@mui/material";
import axios from "axios";

export default function EnterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/request-token", { email });
      setSubmitted(true);
    } catch (err) {
      setError("Failed to send login link. Please try again.");
      console.error(err);
    }
  };

  return (
    <Stack spacing={3} maxWidth="400px" mx="auto" mt={10}>
      <Typography variant="h4" align="center">Enter the Coil</Typography>
      {submitted ? (
        <Alert severity="success">
          A login link has been sent to your email.
        </Alert>
      ) : (
        <>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>Send Link</Button>
          {error && <Alert severity="error">{error}</Alert>}
        </>
      )}
    </Stack>
  );
}
