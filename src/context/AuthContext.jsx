import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../auth/firebase"; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUsuario(user);
        setCargando(false);
    });

    return () => unsubscribe(); // Limpiar suscripción
}, []);

const cerrarSesion = () => signOut(auth);

    return (
    <AuthContext.Provider value={{ usuario, cerrarSesion }}>
        {!cargando && children}
    </AuthContext.Provider>
);
};
