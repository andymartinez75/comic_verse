import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/header.jsx';
import Nav from './components/nav.jsx';
import Main from './components/main.jsx';
import Gallery from './components/gallery.jsx';
import Footer from './components/footer.jsx';

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
