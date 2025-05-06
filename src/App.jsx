import { useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import ProductosContainer from './components/ProductosContainer';
import Carrito from './components/Carrito';

function App() {
  const [productosCarrito, setProductosCarrito] = useState([])

  function funcionCarrito(producto){
    const existe = productosCarrito.find(p => p.id === producto.id);
    console.log(existe)
    if (existe) {
        const carritoActualizado = productosCarrito.map((p) => {
            if (p.id === producto.id){
                const productoActualizado = {...p, cantidad: p.cantidad + producto.cantidad}
                return productoActualizado
            }else{
                return p
            }
        })
        setProductosCarrito(carritoActualizado)
    }else{
        // Si no existe, lo agregamos con su cantidad
        const nuevoCarrito = [...productosCarrito, producto];
        setProductosCarrito(nuevoCarrito)
    }

  }

  function borrarProductoCarrito(id){
    console.log(id)
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  }

  
  return (
    <Router>
      <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosContainer functionCarrito={funcionCarrito}/>} />
          <Route path="/carrito" element={<Carrito productosCarrito={productosCarrito} funcionBorrar={borrarProductoCarrito}/>}/>      
        </Routes>
      </div>
    </Router>
  )
}

export default App