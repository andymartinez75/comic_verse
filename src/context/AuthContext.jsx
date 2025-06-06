import React, { createContext, useContext, useState } from 'react';
import usuariosData from '../data/usuarios.json'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const usuarioEncontrado = usuariosData.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioEncontrado) {
      setUser({ email: usuarioEncontrado.email, isAdmin: usuarioEncontrado.isAdmin });
      return true;
    } else {
      alert('Credenciales incorrectas');
      return false;
    }
  };

  const logout = () => setUser(null);

  const registrarUsuario = (email, password) => {
    
    console.log(`Usuario registrado: ${email} con clave ${password}`);
    setUser({ email, isAdmin: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registrarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);




