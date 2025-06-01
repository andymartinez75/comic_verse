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
import Login from './components/Login';
import RutaPrivada from './components/RutaPrivada';
import { useAuth } from './context/AuthContext'; 
import Registro from './components/Registro';

function App() {
  const { usuario, cerrarSesion } = useAuth(); 
  const [productosCarrito, setProductosCarrito] = useState([]);

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
        usuario={usuario}
        cerrarSesion={cerrarSesion}
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
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <Admin />
            </RutaPrivada>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;


