import React, { useEffect, useState, useRef } from "react";
import "../styles/animacionhome.css";

const ComicBookAnimation = () => {
  const [imagenes, setImagenes] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => {
        const imagenesFiltradas = data
          .filter((item) => item.imagen && item.imagen !== "")
          .map((item) => item.imagen);
        setImagenes(imagenesFiltradas);
      })
      .catch((err) => console.error("Error al cargar cómics:", err));
  }, []);

  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      scrollContainer.scrollLeft += 1;
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      }
    }, 20); 

    return () => clearInterval(interval);
  }, [imagenes]);

  if (imagenes.length === 0) {
    return <p className="cargando">Cargando cómics...</p>;
  }

  return (
    <div className="book-container">
      <div className="book-scroll" ref={scrollRef}>
        {imagenes.map((img, index) => (
          <div className="comic-page" key={index}>
            <img src={img} alt={`comic-${index}`} />
          </div>
        ))}
      </div>
      <a href ="/productos" className="btn-comics">Ir a los cómics</a>
    </div>
  );
};

export default ComicBookAnimation;




