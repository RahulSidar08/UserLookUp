import { useState } from 'react'
import './App.css'
import { Button, TextField, Card, CardContent } from "@mui/material";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './authentication/Login';
import { Signup } from './authentication/Signup';
import { ToastContainer } from "react-toastify";
import UsersList from './components/FetchUsers';
import EditUser from './components/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <div>
      <Login/>
    </div>
  },
  {
    path : "/signup",
    element : <div>
      <Signup/>
    </div>
  },
  {
    path : "/users",
    element : <div>
      <ProtectedRoute>
      <UsersList/>
      </ProtectedRoute>
    </div>
  },
  {
    path : "/edit/:id",
    element : <div>
      <ProtectedRoute>
      <EditUser/>
      </ProtectedRoute>
    </div>
  },

])

function App() {
  return (
    <>
    <div>
      <RouterProvider router={appRouter}/>
    </div>
    <ToastContainer/>
    </>
  )
}

export default App
