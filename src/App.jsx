import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Registro from './components/Registro';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <Header />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Redirige admin fuera de comics */}
        <Route
          path="/productos"
          element={
            user?.isAdmin ? <Navigate to="/admin" /> : <ProductosContainer />
          }
        />
        <Route
          path="/productos/:id"
          element={
            user?.isAdmin ? <Navigate to="/admin" /> : <ProductoDetalle />
          }
        />

        <Route
          path="/carrito"
          element={
            <RutaPrivada>
              <Carrito />
            </RutaPrivada>
          }
        />
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




