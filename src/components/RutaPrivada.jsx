import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RutaPrivada = ({ children, soloAdmin = false, soloUsuario = false }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  // Si no hay usuario logueado, redirige al login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si la ruta es solo para admin y el user no es admin, redirige
  if (soloAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si la ruta es solo para usuario y el user es admin, redirige
  if (soloUsuario && user.isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default RutaPrivada;

