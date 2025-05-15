import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/productoDetalle.css";

function ProductoDetalle({ functionCarrito }) {
const { id } = useParams();
const [producto, setProducto] = useState(null);
const [cantidad, setCantidad] = useState(1);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    fetch("https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos")
    .then((res) => res.json())
    .then((datos) => {
        const productoEncontrado = datos.find((item) => item.id === id);
        if (productoEncontrado) {
        
        productoEncontrado.price = Number(productoEncontrado.price);
        setProducto(productoEncontrado);
        } else {
        setError("Producto no encontrado.");
        }
        setCargando(false);
    })
    .catch((err) => {
        console.error("Error:", err);
        setError("Hubo un error al obtener el producto.");
        setCargando(false);
    });
}, [id]);

function agregarAlCarrito() {
    if (cantidad < 1) return;

    functionCarrito({ ...producto, cantidad });

    Swal.fire({
    title: "Producto agregado",
    text: `Agregaste ${cantidad} unidad(es) de "${producto.name}" al carrito.`,
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    background: "#0f3460",
    color: "#dfec23"
    });
}

function sumarContador() {
    setCantidad(cantidad + 1);
}

function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
}

if (cargando) return <p style={{ color: "white" }}>Cargando producto...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;
if (!producto) return null;

return (
    <div className="detalle-producto">
    <img
        className="detalle-producto-img"
        src={producto.imagen}
        alt={producto.name}
    />
    <div className="detalle-producto-info">
        <h1>{producto.name}</h1>
        <p>{producto.description}</p>
        <p className="precio">Precio: ${producto.price.toFixed(2)}</p>

        <div className="controles-detalle">
        <button onClick={restarContador}>-</button>
        <span className="cantidad">{cantidad}</span>
        <button onClick={sumarContador}>+</button>
        </div>

        <button onClick={agregarAlCarrito}>Agregar al carrito</button>
    </div>
    </div>
);
}

export default ProductoDetalle;

