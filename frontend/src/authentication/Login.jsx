import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { errorHandler, successHandler } from "../utils/toastHandlers";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { setToken } from "../redux/authSlice";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    console.log(data)
    let userData = {
        email : data.email,
        password : data.password
    }
    try {
        const response = await axios.post("https://reqres.in/api/login", userData);
        successHandler("LoggedIn successfully")
        localStorage.setItem("token", response.data.token);
        dispatch(setToken(response.data.token))
        setTimeout(() => {
            navigate("/users")
        }, 2000);
      } catch (error) {
        const errorMessage = error.response?.data?.error || "Something went wrong!";
        errorHandler(errorMessage);
        console.error("Login failed:", error.response?.data || error.message);
      }
  };

  return (
<Container maxWidth="xs">
  <Box
    sx={{
      mt: 8,
      p: 4,
      boxShadow: 3,
      borderRadius: 2,
      textAlign: "center",
      bgcolor: "background.paper",
    }}
  >
    <Typography variant="h5" gutterBottom>
      Login
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="Email"
        {...register("email", { required: "Email is required" })}
        variant="outlined"
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register("password", { required: "Password is required" })}
        variant="outlined"
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </form>
    <Grid container justifyContent="center" sx={{ mt: 2 }}>
      <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
        <Typography variant="body2">Don't have an account? Sign Up</Typography>
      </Link>
    </Grid>
  </Box>
</Container>

  );
};
