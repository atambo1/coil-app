import React from "react";
import { Container, Typography, Button, Stack, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleChoose = async (coilId) => {
    const user = JSON.parse(localStorage.getItem("coilUser"));
  
    if (!user?.email) {
      console.error("No user found in localStorage.");
      return;
    }
  
    try {
      const res = await axios.post("/api/set-coil", {
        email: user.email,
        coil: coilId,
      });
  
      localStorage.setItem("coilUser", JSON.stringify(res.data.user));
      navigate(`/${coilId}`);
    } catch (err) {
      console.error("Failed to update coil:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to the Coil
      </Typography>

      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        This place is a beginning. You are known to us now. From here, you may choose your path — or let the path choose you.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h6" align="center">
            Choose your Coil
          </Typography>
          <Button variant="outlined" onClick={() => handleChoose("catholics-of-internal-light")}>
            Catholics of Internal Light
          </Button>
          <Button variant="outlined" onClick={() => handleChoose("church-of-irregular-lovins")}>
            Church of Irregular Lovins
          </Button>
          <Button variant="outlined" onClick={() => handleChoose("congregation-of-infinite-love")}>
            Congregation of Infinite Love
          </Button>
          <Button variant="contained" onClick={() => handleChoose("catholics-of-internal-light")}>
            Let the Coil choose for me
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
