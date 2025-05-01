import React from 'react';
import '../styles/gallery.css';

const Gallery = ({ comics, agregarAlCarrito }) => {
    return (
    <section className="gallery">
        {comics.map((comic) => (
        <div key={comic.id} className="comic-card">
            <img src={comic.image} alt={comic.title} />
            <h3>{comic.title}</h3>
            <p>{comic.description}</p>
            <button onClick={() => agregarAlCarrito(comic)}>Agregar al carrito</button>
        </div>
        ))}
    </section>
    );
};

export default Gallery;
