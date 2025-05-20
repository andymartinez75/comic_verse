import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './layouts/Home';
import ProductosContainer from './components/ProductosContainer';
import ProductoDetalle from './components/ProductoDetalle';
import Carrito from './components/Carrito';
import Contacto from './components/Contacto';
import About from './components/About';
import Admin from './components/Admin';
import Swal from 'sweetalert2';

function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const loginUser = () => {
    setIsUserLoggedIn(true);
    Swal.fire({
    title: '¡Usuario logueado!',
    icon: 'success',
    background: '#0f3460',
    color: '#dfec23'
  });
  };

  const logoutUser = () => {
    setIsUserLoggedIn(false);
    Swal.fire({
      title:'Sesión cerrada',
      icon: 'info',
      background: "#0f3460",
      color: "#dfec23"
  });
  };

  const loginAdmin = () => {
    setIsAdmin(true);
    Swal.fire({
      title:'¡Admin logueado!',
      icon:'success',
      background: "#0f3460",
      color: "#dfec23"
  });
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    Swal.fire({
      title:'Admin deslogueado',
      icon: 'info',
      background: "#0f3460",
      color: "#dfec23"
  });
  };

  const funcionCarrito = (producto) => {
    const existe = productosCarrito.find(p => p.id === producto.id);
    if (existe) {
      const actualizado = productosCarrito.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + producto.cantidad } : p
      );
      setProductosCarrito(actualizado);
    } else {
      setProductosCarrito([...productosCarrito, producto]);
    }
  };

  const borrarProductoCarrito = (id) => {
    setProductosCarrito(productosCarrito.filter(p => p.id !== id));
  };

  const aumentarCantidad = (id) => {
    setProductosCarrito(productosCarrito.map(p =>
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    ));
  };

  const reducirCantidad = (id) => {
    const producto = productosCarrito.find(p => p.id === id);
    if (producto.cantidad === 1) {
      borrarProductoCarrito(id);
    } else {
      setProductosCarrito(productosCarrito.map(p =>
        p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
      ));
    }
  };

  return (
    <div>
      <Header />
      <Nav
        isAdmin={isAdmin}
        isUserLoggedIn={isUserLoggedIn}
        loginUser={loginUser}
        logoutUser={logoutUser}
        loginAdmin={loginAdmin}
        logoutAdmin={logoutAdmin}
        productosCarrito={productosCarrito}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosContainer functionCarrito={funcionCarrito} />} />
        <Route path="/productos/:id" element={<ProductoDetalle functionCarrito={funcionCarrito} />} />
        <Route path="/carrito" element={<Carrito
          productosCarrito={productosCarrito}
          funcionBorrar={borrarProductoCarrito}
          aumentarCantidad={aumentarCantidad}
          reducirCantidad={reducirCantidad}
        />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin isAdmin={isAdmin} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

