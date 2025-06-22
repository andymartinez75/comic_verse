import { useState } from "react";
import ProductoCard from "./Card";
import "../styles/productos.css";
import { useCartContext } from "../context/CartContext";
import { useProductsContext } from "../context/ProductsContext";

export default function ProductosContainer() {
  const { productos } = useProductsContext();
  const { funcionCarrito } = useCartContext();
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("");

  const productosFiltrados = productos.filter((prod) =>
    prod.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (orden) {
      case "nombre-asc":
        return a.name.localeCompare(b.name);
      case "nombre-desc":
        return b.name.localeCompare(a.name);
      case "precio-asc":
        return parseFloat(a.price) - parseFloat(b.price);
      case "precio-desc":
        return parseFloat(b.price) - parseFloat(a.price);
      default:
        return 0;
    }
  });

  return (
    <div className="productos-container">
      <h2 className="titulo">Cómics disponibles</h2>

      <div className="filtros-productos">
        <input
          type="text"
          placeholder="Buscar cómics por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />

        <select
          className="select-orden"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="">Ordenar por...</option>
          <option value="nombre-asc">Nombre A-Z</option>
          <option value="nombre-desc">Nombre Z-A</option>
          <option value="precio-asc">Precio menor a mayor</option>
          <option value="precio-desc">Precio mayor a menor</option>
        </select>
      </div>

      <div className="productos-grid">
        {productosOrdenados.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            funcionCarrito={funcionCarrito}
          />
        ))}
      </div>
    </div>
  );
}


