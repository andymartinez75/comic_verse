import { Link } from "react-router-dom";

function Card({ producto }) {
return (
    <div className="producto-card">
    <h1 style={{ color: "white" }}>{producto.name}</h1>
    <img className="producto-image" src={producto.imagen} alt={producto.name} />
    <p style={{ color: "white" }}>{producto.price} $</p>
    <Link
        to={`/productos/${producto.id}`}
        style={{
        background: "#dfec23",
        color: "#0f3460",
        fontFamily: "Bangers",
        padding: "0.3rem 1rem",
        borderRadius: "8px",
        textDecoration: "none",
        display: "inline-block",
        marginTop: "1rem"
        }}
    >
        Ver detalles
    </Link>
    </div>
);
}

export default Card;


