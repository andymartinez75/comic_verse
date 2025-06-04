import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/nav.css';
import { useAuthContext } from '../context/AuthContext';

const Nav = ({ productosCarrito }) => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { user, login, logout } = useAuthContext();

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    const cantidadProductos = productosCarrito.length;
    const handleLogin = () => {
    
    const email = prompt('Ingrese usuario (ej: admin para admin):');
    const pass = prompt('Ingrese contraseña (para admin: 1234):');
    login(email, pass);
};

    return (
        <nav className="nav">
            <div className="nav-top">
                <button className="menu-toggle" onClick={toggleMenu}>☰</button>
            </div>
            <ul className={`nav-links ${menuAbierto ? 'abierto' : ''}`}>
                <li><NavLink to="/" onClick={cerrarMenu}>Inicio</NavLink></li>
                <li><NavLink to="/about" onClick={cerrarMenu}>Acerca de</NavLink></li>
                <li><NavLink to="/contacto" onClick={cerrarMenu}>Contacto</NavLink></li>
                <li><NavLink to="/productos" onClick={cerrarMenu}>Cómics</NavLink></li>
                <li>
                    <NavLink to="/carrito" className="carrito-icono" onClick={cerrarMenu}>
                        <FaShoppingCart />
                        {cantidadProductos > 0 && (
                            <span className="carrito-contador">{cantidadProductos}</span>
                        )}
                    </NavLink>
                </li>
                {user?.isAdmin && (
            <li><NavLink to="/admin" onClick={cerrarMenu}>Admin</NavLink></li>
        )}
        <li>
            {!user ? (
            <button onClick={handleLogin} className="boton-login">Login</button>
        ) : (
            <button onClick={() => { logout(); cerrarMenu(); }} className="boton-login">
            Cerrar sesión
            </button>
        )}
            
                    
                </li>
            </ul>
        </nav>
    );
};

export default Nav;


