import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
};

    return (
    <form onSubmit={handleSubmit}>
    <h2>Iniciar Sesión</h2>
    <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
    <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit">Ingresar</button>
    </form>
);
};

export default Login;


