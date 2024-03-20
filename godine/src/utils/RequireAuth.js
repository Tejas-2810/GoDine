import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
    const { clearAuthData, isValid } = useAuth();
    const location = useLocation();

    if(isValid()){
        return <Outlet />
    }
    
    clearAuthData();
    return <Navigate to="/signin" state={{from: location}}  replace />;
}

export default RequireAuth;