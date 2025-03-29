import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
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
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            variant="outlined"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
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
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
