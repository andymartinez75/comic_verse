import "../styles/Carrito.css";

function CarritoCard({ producto, funcionDisparadora, aumentarCantidad, reducirCantidad }) {
return (
    <div className="carrito-card">
    <h3 className="carrito-titulo" style={{ color: "white" }}>{producto.name}</h3>
    <p className="descripcion-carrito" style={{ color: "white" }}>{producto.description}</p>
    <img className="carrito-image" src={producto.imagen} alt={producto.name} />

    <div className="carrito-cantidad-controles">
        <button onClick={() => reducirCantidad(producto.id)} className="cantidad-btn">-</button>
        <span className="cantidad-num">{producto.cantidad}</span>
        <button onClick={() => aumentarCantidad(producto.id)} className="cantidad-btn">+</button>
    </div>

    <div>
        <p style={{ color: "white" }}>Precio unitario</p>
        <span style={{ color: "white" }}>{producto.price.toFixed(2)} $</span>
    </div>
    <div>
        <p style={{ color: "white" }}>Precio total</p>
        <span style={{ color: "white" }}>{(producto.cantidad * producto.price).toFixed(2)} $</span>
    </div>

    <button
        className="boton-carrito"
        onClick={() => funcionDisparadora(producto.id)}
        style={{ backgroundColor: "yellow", color: "black" }}
    >
        X
    </button>
    </div>
);
}

export default CarritoCard;

