import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RutaPrivada = ({ children }) => {
    const { user } = useAuthContext();
    const location = useLocation();


    const isAdminRoute = location.pathname === "/admin";


    if (!user) {
    return <Navigate to="/login" replace />;
}


    if (isAdminRoute && !user.isAdmin) {
    return <Navigate to="/" replace />;
}


    return children;
};

export default RutaPrivada;
