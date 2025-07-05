import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/login.css';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuthContext(); 
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioLogueado = login({ email, password });

    if (usuarioLogueado) {
      toast.success('¡Bienvenido!', {
        className: 'toast-estilo',
        bodyClassName: 'toast-body',
        progressClassName: 'toast-progress'
      });

      setTimeout(() => {
        if (usuarioLogueado.isAdmin) {
          navigate('/admin');
        } else {
          navigate(destino);
        }
      }, 300);
    } else {
      toast.error('Credenciales incorrectas', {
        className: 'toast-estilo',
        bodyClassName: 'toast-body',
        progressClassName: 'toast-progress'
      });
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


