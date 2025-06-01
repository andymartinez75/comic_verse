import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/nav.css';

const Nav = ({
    isAdmin,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    loginAdmin,
    logoutAdmin,
    productosCarrito
}) => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    const cantidadProductos = productosCarrito.length;

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
                {isAdmin && (
                    <li><NavLink to="/admin" onClick={cerrarMenu}>Admin</NavLink></li>
                )}
                <li>
                    {!isUserLoggedIn ? (
                        <button onClick={loginUser} className="boton-login">Login Usuario</button>
                    ) : (
                        <button onClick={logoutUser} className="boton-login">Logout Usuario</button>
                    )}
                </li>
                <li>
                    {!isAdmin ? (
                        <button onClick={loginAdmin} className="boton-login">Login Admin</button>
                    ) : (
                        <button onClick={logoutAdmin} className="boton-login">Salir Admin</button>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Nav;


