import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

// it will hold all auth related data
const AuthContext = React.createContext({});

const USER_STATE = "godine_user_state";
const TOKEN = "token";

export const AuthProvider = ({ children }) => {
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        setUserState(JSON.parse(sessionStorage.getItem(USER_STATE)));
    }, []);

    // sets user state and cookie
    const setAuthData = (token, role) => {
        const userInfo = jwtDecode(token);
        // default expiry of 10 mins in milliseconds
        const defaultExpiryTime = 10 * 60 * 1000;
        const defaultExpiresIn = Date.now() + defaultExpiryTime;

        const id = userInfo.id;
        const expiry = userInfo.exp ? userInfo.exp*1000 : defaultExpiresIn;

        const state = {
            userId: id,
            expiresIn: expiry,
            role: role
        };

        sessionStorage.setItem(TOKEN, token);
        setUserState(state);
        sessionStorage.setItem(USER_STATE, JSON.stringify(state));
    }

    // clear user auth data when users logs out or validity expires
    const clearAuthData = () => {
        setUserState(null);
        sessionStorage.removeItem(USER_STATE);
        sessionStorage.removeItem(TOKEN);
    }

    // fetch current auth data of the user
    const getAuthData = () => {
        if (!userState) {
            return JSON.parse(sessionStorage.getItem(USER_STATE));
        }
        return userState;
    }

    // user id for fetching data of the user
    const getUserId = () => {
        return userState?.userId || getAuthData()?.userId;
    }

    // checking session validity
    const isSessionValid = () => {
        const currentState = JSON.parse(sessionStorage.getItem(USER_STATE));
        const userId = currentState ? currentState.userId : userState?.userId;
        const expiry = currentState ? currentState.expiresIn : userState?.expiresIn;
        const role = currentState ? currentState.role : userState?.role;

        return userId !== null && userId !== ''
            && expiry !== null && expiry !== ''
            && Date.now() <= expiry
            && role !== null && role !== '';
    }

    const authData = {
        getAuthData,
        setAuthData,
        clearAuthData,
        isSessionValid,
        getUserId
    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;