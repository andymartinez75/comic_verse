import "../styles/Carrito.css"
import CarritoCard from "./CarritoCard.jsx"
import { useNavigate } from 'react-router-dom';


export default function Carrito({
    productosCarrito,
    funcionBorrar,
    aumentarCantidad,
    reducirCantidad
}) {
    const navigate = useNavigate();

    const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + producto.price * producto.cantidad,
    0
)
return (
    <div className="carrito-seccion">
    <h2 className="carrito-titulo">Tu Carrito</h2>

    {productosCarrito.length === 0 ? (
        <p className="carrito-vacio">Carrito vacío</p>
    ) : (
        <div className="carrito-tabla">
        <div className="carrito-fila encabezado">
            <span >Producto</span>
            <span>Descripción</span>
            <span>Imagen</span>
            <span>Cantidad</span>
            <span>Precio unitario</span>
            <span>Sub total</span>
            <span></span>
        </div>

        {productosCarrito.map((producto) => (
            <div key={producto.id} className="carrito-fila">
            <span className="carrito-nombre">{producto.name}</span>
            <span>{producto.description}</span>
            <img
                src={producto.imagen}
                alt={producto.name}
                className="carrito-image"
            />
            <span>
                <button onClick={() => reducirCantidad(producto.id)}>-</button>
                <span style={{ margin: "0 8px" }}>{producto.cantidad}</span>
                <button onClick={() => aumentarCantidad(producto.id)}>+</button>
            </span>
            <span>{producto.price.toFixed(2)} $</span>
              <span>{(producto.price * producto.cantidad).toFixed(2)} $</span>
            <button
                onClick={() => funcionBorrar(producto.id)}
                className="boton-borrar"
            >
                X
            </button>
            </div>
        ))}
        </div>
    )}

    {total > 0 && (
    <>
    <div className="carrito-total">
    Total a pagar: ${total.toFixed(2)}
    </div>
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
    <button onClick={() => navigate('/productos')} className="boton-volver">
        🛍️ Seguir comprando
    </button>
    </div>
</>
)}
    </div>
    );
}

