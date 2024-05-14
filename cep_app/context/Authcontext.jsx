// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);

    const login = () => {
        setIsLoading(true);
        setUserToken('hhfhef');
        setIsLoading(false); 
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setIsLoading(false); 
    };

    return (
        <AuthContext.Provider value={{ isLoading, userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
