import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const RutaPrivada = ({ children }) => {
    const { user } = useAuthContext();
    return user ? children : <Navigate to="/login" />;
};

export default RutaPrivada;
