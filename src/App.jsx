import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

export default function App() {
  const [comics, setComics] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Simulando datos de comics
    const comicsData = [
      { id: 1, title: 'Spider-Man', description: 'El hombre araña', image: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Batman', description: 'El caballero de la noche', image: 'https://via.placeholder.com/150' },
      { id: 3, title: 'Superman', description: 'El hombre de acero', image: 'https://via.placeholder.com/150' },
    ];
    setComics(comicsData);
  }, []);

  const agregarAlCarrito = (comic) => {
    setCarrito([...carrito, comic]);
  };

  return (
    <Router>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/comics" element={<Gallery comics={comics} agregarAlCarrito={agregarAlCarrito} />} />
      </Routes>
      <Footer />
    </Router>
  );
}
