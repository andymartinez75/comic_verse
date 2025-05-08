import "../styles/Carrito.css"
import CarritoCard from "./CarritoCard.jsx"

export default function Carrito({
    productosCarrito,
    funcionBorrar,
    aumentarCantidad,
    reducirCantidad
}) {
    const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + producto.price * producto.cantidad,
    0
)

function funcionDisparadora(id) {
    funcionBorrar(id)
}

return (
    <div className="carrito-seccion">
        <div className="carrito-conteiner">
        {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
            <CarritoCard
            key={producto.id}
            producto={producto}
            funcionDisparadora={funcionDisparadora}
            aumentarCantidad={aumentarCantidad}
            reducirCantidad={reducirCantidad}
            />
        ))
        ) : (
        <p>Carrito vacío</p>
        )}
    </div>

    {total > 0 && (
        <div
        style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#dfec23",
            fontFamily: "Bangers",
            fontSize: "1.5rem",
        }}
        >
        Total a pagar: ${total}
        </div>
    )}
    </div>
)
}


