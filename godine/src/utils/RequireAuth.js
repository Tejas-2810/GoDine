import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { getAuthData, isSessionValid } = useAuth();
    const location = useLocation();

    return allowedRoles.includes(getAuthData().role)? 
            isSessionValid? <Outlet />
                    : <Navigate to="/signin" state={{from: location}}  replace />
            : !role ? <Navigate to="/signin" state={{from: location}}  replace /> 
                    : <Navigate to="/unauthorized" replace/>
}

export default RequireAuth;