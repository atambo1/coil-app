import React, { useState } from "react";
import { Container, TextField, Button, Typography, Stack, Alert } from "@mui/material";
import axios from "axios";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/request-token", { email });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("We couldn't send your link. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Stack spacing={4}>
        <Typography variant="h4" align="center">
          Enter the Coil
        </Typography>

        <Typography align="center" color="text.secondary">
          Begin your journey inward. To walk the Coil, we must first know that you're here.
        </Typography>

        {submitted ? (
          <Alert severity="success">
            A link has been sent to <strong>{email}</strong>. Click it to continue.
          </Alert>
        ) : (
          <>
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Send My Link
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </>
        )}
      </Stack>
    </Container>
  );
}
