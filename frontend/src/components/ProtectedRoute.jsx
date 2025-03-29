import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import store from '../redux/store'

const ProtectedRoute = ({children}) => {
    const token = useSelector((store) => store.Auth.token) || localStorage.getItem("token")
    if(!token)
    {
         return <Navigate to="/" replace />; 
    }
    return children
}

export default ProtectedRoute