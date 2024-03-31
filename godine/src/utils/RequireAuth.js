import React, {useEffect} from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { getAuthData, clearAuthData, isSessionValid } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if(!isSessionValid()){
            clearAuthData();
        }
    }, []);

    return allowedRoles.includes(getAuthData()?.role)?
            isSessionValid()? <Outlet />
                    : <Navigate to="/signin" state={{from: location}}  replace />
            : !getAuthData()?.role ? <Navigate to="/signin" state={{from: location}}  replace /> 
                    : <Navigate to="/unauthorized" replace/>
}

export default RequireAuth;