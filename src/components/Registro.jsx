import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';


const Registro = () => {
    const { registrarUsuario } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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

    registrarUsuario(email, password);
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
            placeholder="Contraseña mínimo 6 caracteres"
        />
        </div>
        <div>
        <label>Confirmar Contraseña:</label>
        <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirmar la contraseña"
        />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-registrar">Registrarse</button>
    </form>
    </div>
);
};

export default Registro;

