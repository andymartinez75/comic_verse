import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);

const login = (email, password) => {
    // Simulación simple
    if(email === 'admin' && password === '1234'){
        setUser({ email, isAdmin: true });
    } else if(email && password){
        setUser({ email, isAdmin: false });
    }
};

    const logout = () => {
    setUser(null);
};

    const registrarUsuario = (email,/* password*/) => {
    // ver
    setUser({ email, isAdmin: false });
    };

    return (
    <AuthContext.Provider value={{ user, login, logout, registrarUsuario }}>
    {children}
    </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);


