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


function App() {
  const [productosCarrito, setProductosCarrito] = useState([])

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


  return (
    <div>
      <Header/>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosContainer functionCarrito={funcionCarrito} />} />
        <Route path="/carrito" element={<Carrito productosCarrito={productosCarrito} funcionBorrar={borrarProductoCarrito} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
