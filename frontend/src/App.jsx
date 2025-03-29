import { useState } from 'react'
import './App.css'
import { Button, TextField, Card, CardContent } from "@mui/material";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from './authentication/Login';
import { Signup } from './authentication/Signup';
import { ToastContainer } from "react-toastify";
import UsersList from './components/FetchUsers';
import EditUser from './components/EditUser';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App
