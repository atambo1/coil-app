import React from "react";
import { Box, Button, Container, TextField, Typography, Paper, Stack } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        This is the coil
      </Typography>

      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        See a different vision of living.
        This is a place to realize what matters to you, and make the choice to pursue it.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 6 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Seek Guidance or Prayer</Typography>
          <Typography variant="body2" color="text.secondary">
            All people are welcome. No judgment. No strings. We just need to know you're alive.
          </Typography>
          <TextField label="What you wish to be called" variant="outlined" fullWidth />
          <TextField label="How you wish to be contacted (for verification)" variant="outlined" fullWidth />
          <TextField
            label="What's on your heart or mind?"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
          />
          <Button variant="contained" size="large">
            Begin
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: 4, borderRadius: 3, mt: 4 }}>
        <Stack spacing={3}>
          <Typography variant="h5">Support the Mission</Typography>
          <Typography variant="body2" color="text.secondary">
            Your support makes guidance and prayer possible for all who seek it.
          </Typography>
          <Button variant="outlined" size="large">
            Help us help others
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}