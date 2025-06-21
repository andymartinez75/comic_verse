import { createContext, useContext, useEffect, useState } from "react";
import usuarios from "../data/usuarios.json";

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
    const found = usuarios.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem("usuarioActual", JSON.stringify(found));
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("usuarioActual");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};







