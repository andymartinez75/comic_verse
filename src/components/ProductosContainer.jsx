import { useEffect, useState } from "react";
import ProductoCard from "./Card";
import "../styles/productos.css";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [redirigir, setRedirigir] = useState(false);
  const { funcionCarrito } = useCartContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.isAdmin) {
      Swal.fire({
        icon: "warning",
        title: "Acceso denegado",
        text: "Los administradores no pueden acceder a la sección de cómics.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setRedirigir(true);
      });
    }
  }, [user]);

  useEffect(() => {
    fetch("https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  if (redirigir) return <Navigate to="/admin" />;

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

