import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/login.css';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';


const Login = () => {
  const { login, user } = useAuthContext(); 
  const navigate = useNavigate();
  const location = useLocation();

  
  const destino = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login({ email, password });

    if (success) {
      toast.success('¡Bienvenido!', 'Inicio de sesión exitoso', 'success');

      // Ver
      setTimeout(() => {
        if (user?.isAdmin) {
          navigate('/admin');
        } else {
          navigate(destino);
        }
      }, 300);

    } else {
      toast.error('Error', 'Credenciales incorrectas', 'error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

