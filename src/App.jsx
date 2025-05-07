import { useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ProductosContainer from './components/ProductosContainer'
import Carrito from './components/Carrito'
import About from './components/About' 
import Contacto from './components/Contacto' 

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
  }

  function borrarProductoCarrito(id) {
    const nuevoCarrito = productosCarrito.filter(p => p.id !== id)
    setProductosCarrito(nuevoCarrito)
  }

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosContainer functionCarrito={funcionCarrito} />} />
        <Route path="/carrito" element={<Carrito productosCarrito={productosCarrito} funcionBorrar={borrarProductoCarrito} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </div>
  )
}

export default App
