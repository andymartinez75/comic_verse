import { useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ProductosContainer from './components/ProductosContainer'
import Carrito from './components/Carrito'
import About from './components/About' 
import Contacto from './components/Contacto' 
import Header from './components/Header'
import Footer from './components/Footer'
import Swal from 'sweetalert2'
import Admin from './components/Admin';
import ProductoDetalle from './components/ProductoDetalle';




function App() {
  const [productosCarrito, setProductosCarrito] = useState([])
  const [isAdmin, setIsAdmin] = useState(true);

  function funcionCarrito(producto) {
    const existe = productosCarrito.find(p => p.id === producto.id)
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + producto.cantidad }
          : p
      )
      setProductosCarrito(carritoActualizado)
    } else {
      setProductosCarrito([...productosCarrito, producto])
    }
  
  Swal.fire({
    title: '¡Agregado!',
    text: `${producto.name} fue agregado al carrito.`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    background: '#0f3460',
    color: '#dfec23'
  })
}

  function borrarProductoCarrito(id) {
    const nuevoCarrito = productosCarrito.filter(p => p.id !== id)
    setProductosCarrito(nuevoCarrito)
  

  Swal.fire({
    title: 'Eliminado',
    text: 'Producto quitado del carrito.',
    icon: 'warning',
    timer: 1500,
    showConfirmButton: false,
    background: '#0f3460',
    color: '#dfec23'
  })
}
function aumentarCantidad(id) {
  const actualizado = productosCarrito.map((p) =>
    p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
  );
  setProductosCarrito(actualizado);
}

function reducirCantidad(id) {
  const producto = productosCarrito.find((p) => p.id === id);
  if (producto.cantidad === 1) {
    borrarProductoCarrito(id);
  } else {
    const actualizado = productosCarrito.map((p) =>
      p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
    );
    setProductosCarrito(actualizado);
  }
}



  return (
    <div>
      <Header/>
      
      <Nav isAdmin={isAdmin} setIsAdmin={setIsAdmin} productosCarrito={productosCarrito}/>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosContainer functionCarrito={funcionCarrito} />} />
        <Route path="/carrito" element={<Carrito 
        productosCarrito={productosCarrito} 
        funcionBorrar={borrarProductoCarrito}
        aumentarCantidad={aumentarCantidad}
        reducirCantidad={reducirCantidad} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos/:id" element={<ProductoDetalle functionCarrito={funcionCarrito}/>} />
        <Route path="/admin" element={<Admin isAdmin={isAdmin} />} /> {/* 🔐 */}

      </Routes>

      <Footer/>
    </div>
  )
}

export default App
