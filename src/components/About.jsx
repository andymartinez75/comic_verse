import React from 'react';
import "../styles/about.css";

const About = () => {
  return (
    <section className="bg-[#0f3460] text-[#dfec23] p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mt-10">
      <h2 className="text-4xl font-bold mb-6 text-center border-b border-[#dfec23] pb-2">
        Bienvenid@ a Comic Verse
      </h2>
      <p className="text-lg leading-relaxed mb-4 text-white">
        En el corazón del multiverso, existe un portal donde los héroes cobran vida, los villanos conspiran entre sombras, y cada página es una explosión de aventura. Ese portal es <strong>Comic Verse</strong>.
      </p>
      <p className="text-lg leading-relaxed mb-4 text-white">
        Somos más que una tienda de cómics. Somos un refugio para quienes crecieron soñando con capas, rayos láser y mundos imposibles. Aquí vas a encontrar desde los clásicos de siempre hasta nuevas joyas del noveno arte, cuidadosamente seleccionadas para fans como vos.
      </p>
      <p className="text-lg leading-relaxed text-white">
        Ya seas del team Marvel, DC, indie o manga, en Comic Verse hay un universo esperándote. Porque los cómics no se coleccionan, se viven.
      </p>
      <div className="mt-6 text-center">
        <span className="text-[#dfec23] font-semibold">¡Unite al universo!</span>
      </div>
    </section>
  );
};

export default About;
