import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
return (
    <nav className="nav">
    <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Acerca de</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/productos">Comics</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
    </ul>
    </nav>
);
};

export default Nav;
