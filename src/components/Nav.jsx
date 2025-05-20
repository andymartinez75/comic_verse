import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/nav.css';
import { FaShoppingCart } from 'react-icons/fa';

const Nav = ({ isAdmin, setIsAdmin }) => {
const [menuAbierto, setMenuAbierto] = useState(false);

const toggleMenu = () => setMenuAbierto(!menuAbierto);
const cerrarMenu = () => setMenuAbierto(false);

const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    cerrarMenu();
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
            <li><NavLink to="/carrito"className="carrito-icono" onClick={cerrarMenu}><FaShoppingCart /></NavLink></li>
            {isAdmin && (
            <li><NavLink to="/admin" onClick={cerrarMenu}>Admin</NavLink></li>
            )}
            <li>
            <button
                onClick={toggleAdmin}
                style={{
                background: '#dfec23',
                color: '#0f3460',
                fontFamily: 'Bangers',
                border: 'none',
                padding: '0.2rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                }}
            >
                {isAdmin ? 'Salir Admin' : 'Login Admin'}
            </button>
            </li>
        </ul>
        </nav>
    );
};

export default Nav;
