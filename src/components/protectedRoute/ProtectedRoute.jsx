import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'  
import Login from '../../pages/Auth/Login/Login';

export default function ProtectedRoute() { 
    const { user, loading } = useSelector(state => state.user) 
    return loading ? (<div></div>) : user ? <Outlet /> : <Login />
}
