import React from 'react';
import '../styles/main.css';
import { Helmet } from 'react-helmet-async';

const Main = () => {
return (
    <main className="main">
    <Helmet>
        <title>ComicVerse - Inicio</title>
        <meta name="description" content="Bienvenido a ComicVerse. Encuentra tus cómics favoritos y crea tu colección personalizada." />
    </Helmet>

    <h2>¡Bienvenido a Comic Verse!</h2>
    <p>Encuentra tus comics favoritos y crea tu colección.</p>
    </main>
);
};

export default Main;
