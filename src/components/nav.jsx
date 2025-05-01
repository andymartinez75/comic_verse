import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
return (
    <nav className="nav">
    <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/comics">Comics</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
    </ul>
    </nav>
);
};

export default Nav;
