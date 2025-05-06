import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
return (
    <nav className="nav">
    <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/comics">Acerca de</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
    </ul>
    </nav>
);
};

export default Nav;
