import React from "react";
import { Box, Button, Container, TextField, Typography, Paper, Stack } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Your Spiritual Journey
      </Typography>

      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        A place to reconnect with what matters, through real talk, prayer, and purpose.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 6 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Request Guidance or Prayer</Typography>
          <Typography variant="body2" color="text.secondary">
            All are welcome. No judgment. No strings. We just need a little information to begin.
          </Typography>
          <TextField label="Your Name (optional)" variant="outlined" fullWidth />
          <TextField label="Your Email (optional)" variant="outlined" fullWidth />
          <TextField
            label="What's on your heart or mind?"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
          />
          <Button variant="contained" size="large">
            Send
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: 4, borderRadius: 3, mt: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Support the Mission</Typography>
          <Typography variant="body2" color="text.secondary">
            Your support helps us keep guidance and prayer free for all who seek it.
          </Typography>
          <Button variant="outlined" size="large">
            Make a Donation
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
