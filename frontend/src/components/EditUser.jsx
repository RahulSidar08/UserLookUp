import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { successHandler, errorHandler } from "../utils/toastHandlers";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (error) {
      errorHandler("Failed to fetch user!");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      successHandler("User updated successfully!");
      navigate("/users");
    } catch (error) {
      errorHandler("Failed to update user!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Edit User
        </Typography>

        <TextField 
          sx={{ mt: 2 }} 
          fullWidth 
          label="First Name" 
          value={user.first_name} 
          onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
        />
        
        <TextField 
          sx={{ mt: 2 }} 
          fullWidth 
          label="Last Name" 
          value={user.last_name} 
          onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
        />

        <TextField 
          sx={{ mt: 2 }} 
          fullWidth 
          label="Email" 
          value={user.email} 
          onChange={(e) => setUser({ ...user, email: e.target.value })} 
        />
        <Button 
          onClick={handleUpdate} 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 3, py: 1 }}
        >
          Update
        </Button>
      </Paper>
    </Container>
  );
};

export default EditUser;
