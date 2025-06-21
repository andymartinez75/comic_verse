import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/nav.css';
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';

const Nav = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { user, logout } = useAuthContext();
    const { productosCarrito, vaciarCarrito } = useCartContext();
    const navigate = useNavigate();

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    const cantidadProductos = productosCarrito.reduce((total, p) => total + p.cantidad, 0);

    const handleLogin = () => {
    cerrarMenu();
    navigate('/login');
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

        {/* SOLO si NO es admin */}
        {!user?.isAdmin && (
        <>
            <li><NavLink to="/productos" onClick={cerrarMenu}>Cómics</NavLink></li>
            <li>
            <NavLink to="/carrito" className="carrito-icono" onClick={cerrarMenu}>
                <FaShoppingCart />
                {cantidadProductos > 0 && (
                <span className="carrito-contador">{cantidadProductos}</span>
                )}
            </NavLink>
            </li>
        </>
        )}

        {/* SOLO si es admin */}
        {user?.isAdmin && (
        <li><NavLink to="/admin" onClick={cerrarMenu}>Admin</NavLink></li>
        )}

        {/* LOGIN / CERRAR SESIÓN */}
        <li>
        {!user ? (
            <button onClick={handleLogin} className="boton-login">Login</button>
        ) : (
            <button
            onClick={() => {
                logout();
                vaciarCarrito();
                cerrarMenu();
                navigate('/');
            }}
            className="boton-login"
            >
            Cerrar sesión
            </button>
        )}
        </li>
    </ul>
    </nav>
);
};

export default Nav;


