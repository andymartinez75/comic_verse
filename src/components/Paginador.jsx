import React from "react";
import "../styles/paginador.css";

const Paginador = ({ totalPaginas, paginaActual, setPaginaActual }) => {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="paginador">
      {paginas.map((pagina) => (
        <button
          key={pagina}
          className={pagina === paginaActual ? "activo" : ""}
          onClick={() => setPaginaActual(pagina)}
        >
          {pagina}
        </button>
      ))}
    </div>
  );
};

export default Paginador;
