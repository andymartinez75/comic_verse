import { createContext, useContext, useEffect, useState } from "react";
import usuariosBase from "../data/usuarios.json"; 

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuarioActual");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = ({ email, password }) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios.json")) || usuariosBase;
    const found = usuarios.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem("usuarioActual", JSON.stringify(found));
      setUser(found);
      return found;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("usuarioActual");
    setUser(null);
    window.location.href = "/"; 
  };

  const registrarUsuario = (email, password, isAdmin = false) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios.json")) || usuariosBase;

    const yaExiste = usuarios.find(u => u.email === email);
    if (yaExiste) {
      return { success: false, mensaje: "El correo ya está registrado" };
    }

    const nuevo = { email, password, isAdmin };
    const actualizados = [...usuarios, nuevo];
    localStorage.setItem("usuarios.json", JSON.stringify(actualizados));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registrarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};








