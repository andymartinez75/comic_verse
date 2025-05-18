import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
            <li><Link to="/about" onClick={cerrarMenu}>Acerca de</Link></li>
            <li><Link to="/contacto" onClick={cerrarMenu}>Contacto</Link></li>
            <li><Link to="/productos" onClick={cerrarMenu}>Cómics</Link></li>
            <li><Link to="/carrito"className="carrito-icono" onClick={cerrarMenu}><FaShoppingCart /></Link></li>
            {isAdmin && (
            <li><Link to="/admin" onClick={cerrarMenu}>Admin</Link></li>
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
