import { useEffect, useState } from "react";
import ProductoCard from "./Card";
import "../styles/productos.css";
import { useCartContext } from "../context/CartContext";
//import { useAuthContext } from "../context/AuthContext";

export default function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const { funcionCarrito } = useCartContext();
 // const { user } = useAuthContext();


  useEffect(() => {
    fetch("https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
    
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);
  
  return (
    <div className="productos-container">
      <h2 className="titulo">Cómics disponibles</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
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

