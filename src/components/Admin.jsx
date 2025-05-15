import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin({ isAdmin }) {
const navigate = useNavigate();

useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // ❌ Redirige si no es admin
    }
}, [isAdmin, navigate]);

return (
    <div style={{
    color: "#dfec23",
    backgroundColor: "#0f3460",
    fontFamily: "Bangers",
    padding: "2rem",
    textAlign: "center"
    }}>
    <h1>⚡ Bienvenido al Panel de Administrador</h1>
    <p>Desde aquí podés cargar nuevos cómics, modificar precios o gestionar productos.</p>
    <div style={{
        backgroundColor: "#1a1a2e",
        border: "2px solid #dfec23",
        borderRadius: "8px",
        padding: "1.5rem",
        marginTop: "2rem",
        color: "white"
    }}>
        <p>Funcionalidades futuras:</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>📦 Agregar nuevos productos</li>
          <li>📝 Editar cómics existentes</li>
          <li>🗑️ Eliminar productos</li>
        </ul>
      </div>
    </div>
  );
}

export default Admin;
