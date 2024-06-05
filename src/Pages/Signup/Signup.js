import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utiles/axiosClient";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { TOAST_SUCCESS } from "../../App";
import { setToast } from "../../redux/slices/Appconfigslice";
import { useDispatch } from "react-redux";
import "./Signup.scss"; // If you need to keep custom styles

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      dispatch(
        setToast({
          type: TOAST_SUCCESS,
          message: response?.result,
        })
      );

      if (response.status === "ok") {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Signup
          </Typography>
          <Box component="form" onSubmit={handlesubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'aqua' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Already have an account? <Link to="/login">Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
