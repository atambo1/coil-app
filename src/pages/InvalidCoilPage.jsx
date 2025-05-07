import React from "react";
import { Container, Typography } from "@mui/material";

export default function InvalidCoilPage({ coilId }) {
  return (
    <Container sx={{ paddingTop: "4rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Unknown Coil: {coilId}
      </Typography>
      <Typography align="center">
        This coil is not recognized. Please check the link or contact support.
      </Typography>
    </Container>
  );
}
