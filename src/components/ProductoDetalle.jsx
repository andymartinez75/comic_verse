import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import "../styles/productoDetalle.css";
import Swal from "sweetalert2";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [redirigir, setRedirigir] = useState(false);

  const { agregarAlCarrito } = useCartContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.isAdmin) {
      Swal.fire({
        icon: "warning",
        title: "Acceso denegado",
        text: "Los administradores no pueden ver detalles de productos.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setRedirigir(true);
      });
    }
  }, [user]);

  useEffect(() => {
    fetch(`https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error("Error al cargar producto:", error));
  }, [id]);

  if (redirigir) return <Navigate to="/admin" />;
  if (!producto) return <p>Cargando...</p>;

  const AgregarAlCarrito = () => {
    const productoConCantidad = {
      id: producto.id,
      name: producto.name,
      description: producto.description,
      imagen: producto.imagen,
      price: Number(producto.price),
      cantidad: Number(cantidad),
    };

    agregarAlCarrito(productoConCantidad);

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `"${producto.name}" se agregó al carrito.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="detalle-producto">
      <h1>{producto.name}</h1>
      <img src={producto.imagen} alt={producto.name} />
      <p>{producto.description}</p>
      <p>Precio: ${Number(producto.price).toFixed(2)}</p>

      <div className="controles-detalle">
        <button onClick={() => setCantidad((c) => Math.max(1, c - 1))}>-</button>
        <span className="cantidad">{cantidad}</span>
        <button onClick={() => setCantidad((c) => c + 1)}>+</button>
      </div>

      <button onClick={AgregarAlCarrito}>Agregar al carrito</button>
      <button className="boton-volver" onClick={() => navigate("/productos")}>
        🛍️ Volver a la tienda
      </button>
      <button className="boton-carrito" onClick={() => navigate("/carrito")}>
        🛒 Ir al carrito
      </button>
    </div>
  );
}



