import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { useState } from 'react';


const Nav = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
    }

return (
    <nav className="nav">
        <button className="menu-toggle" onClick={toggleMenu}>
        ☰
        </button>
    <ul className={`nav-links ${menuAbierto ? 'abierto' : ''}`} >
        <li><Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
        <li><Link to="/about" onClick={() => setMenuAbierto(false)}>Acerca de</Link></li>
        <li><Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link></li>
        <li><Link to="/productos" onClick={() => setMenuAbierto(false)}>Comics</Link></li>
        <li><Link to="/carrito" onClick={() => setMenuAbierto(false)}>Carrito</Link></li>
    </ul>
    </nav>
);
};

export default Nav;
