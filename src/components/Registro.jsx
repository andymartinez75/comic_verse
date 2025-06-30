import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Registro = () => {
    const { registrarUsuario } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
    }

    if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    const resultado = registrarUsuario(email, password);

    if (resultado.success) {
    Swal.fire('Registro exitoso', 'Ahora puedes iniciar sesión.', 'success');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigate('/login');
    } else {
    Swal.fire('Error', resultado.mensaje, 'error');
    }
    };

return (
    <div className="registro-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit} className="form-registro">
        <div>
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="tu@email.com"
        />
        </div>
        <div>
            <label>Contraseña:</label>
            <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
        />
        </div>
        <div>
            <label>Confirmar Contraseña:</label>
            <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            placeholder="Repetir contraseña"
        />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-registrar">Registrarse</button>
    </form>
    </div>
);
};

export default Registro;

