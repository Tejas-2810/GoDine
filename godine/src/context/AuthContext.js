import React, {useState} from 'react'

// it will hold all auth related data
const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [expiryTime, setExpiryTime] = useState(null);
    const [role, setRole] = useState(null);

    const setAuthData = (token, expiry, role) => {
        setToken(token);
        setExpiryTime(expiry);
        setRole(role);

        // setting token and expiry time in local storage.
        localStorage.setItem('authData', JSON.stringify({t: token, et: expiry, r: role}));
    }

    // ! fix 
    // ! what is the meaning of this, AuthContext.js:21 
    // ! Warning: Cannot update a component (`AuthProvider`) while rendering a different component (`RequireAuth`). 
    // !To locate the bad setState() call inside `RequireAuth`
    const clearAuthData = () => {
        setToken(null);
        setExpiryTime(null);
        setRole(null);

        // clearing localStorage
        localStorage.removeItem('authData');
    }

    const isValid = () => {
        const authData = JSON.parse(localStorage.getItem('authData'));
        const t = authData? authData.t: token;
        const et = authData? authData.et: expiryTime;
        const r = authData? authData.r: role;

        return t !== null && t !== '' && et !== null && et !== '' && Date.now() < et
            && r !== null && r!== '';
    }
    
    const authValues = {
        token,
        expiryTime,
        role,
        setAuthData,
        clearAuthData,
        isValid
    }

    return(
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;