import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Container, Typography } from "@mui/material";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    axios
      .post("/api/verify-token", { token })
      .then((res) => {
        const user = res.data.user;
        localStorage.setItem("coilUser", JSON.stringify(user));

        if (user.coil) {
          navigate(`/${user.coil}`);
        } else {
          navigate("/welcome");
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, [params, navigate]);

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      {status === "verifying" && (
        <>
          <CircularProgress />
          <Typography mt={2}>Verifying your token...</Typography>
        </>
      )}
      {status === "error" && (
        <Typography variant="h6" color="error">
          Invalid or expired token.
        </Typography>
      )}
    </Container>
  );
}
