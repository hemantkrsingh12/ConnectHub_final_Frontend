import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utiles/axiosClient";
import { setItem, KEY_ACCESS_TOKEN } from "../../Utiles/localStorage";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/slices/Appconfigslice";
import { TOAST_SUCCESS } from "../../App";
import "./Login.scss"; // If you need to keep custom styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      dispatch(
        setToast({
          type: TOAST_SUCCESS,
          message: response?.result.message,
        })
      );
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
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
            Login
          </Typography>
          <Box component="form" onSubmit={handlesubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              // color="primary"
              sx={{ mt: 3, mb: 2,backgroundColor:"aqua" }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
