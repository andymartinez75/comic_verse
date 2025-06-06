// src/components/Admin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function Admin() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  // Estado para crear o editar un producto: name, price, imagen (URL), description
  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    price: "",
    imagen: "",
    description: ""
  });

  useEffect(() => {
    // Si no hay usuario o no es admin, redirijo al home
    if (!user || !user.isAdmin) {
      navigate("/");
    } else {
      // Si es admin, cargo la lista de productos
      cargarProductos();
    }
  }, [user, navigate]);

  // Función para traer todos los productos desde MockAPI
  const cargarProductos = async () => {
    try {
      const res = await fetch("https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
    }
  };

  // Maneja cambios en los inputs de 'nuevoProducto'
  const manejarCambio = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  // Crear un producto nuevo
  const crearProducto = async () => {
    const { name, price, imagen, description } = nuevoProducto;

    // Validar que todos los campos estén completos
    if (!name || !price || !imagen || !description) {
      Swal.fire("Faltan datos", "Completá todos los campos antes de crear.", "warning");
      return;
    }

    try {
      const res = await fetch("https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, imagen, description })
      });

      if (!res.ok) throw new Error("Error en POST");

      // Mostrar notificación y recargar listado
      Swal.fire("¡Creado!", "El cómic se creó correctamente.", "success");
      setNuevoProducto({ name: "", price: "", imagen: "", description: "" });
      cargarProductos();
    } catch (err) {
      console.error("Error al crear producto:", err);
      Swal.fire("Error", "No se pudo crear el cómic.", "error");
    }
  };

  // Eliminar producto por ID
  const eliminarProducto = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirmar.isConfirmed) {
      try {
        const res = await fetch(`https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Error en DELETE");

        Swal.fire("¡Eliminado!", "El cómic se eliminó correctamente.", "success");
        cargarProductos();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        Swal.fire("Error", "No se pudo eliminar el cómic.", "error");
      }
    }
  };

  // Editar un producto existente (pide nuevos valores mediante prompt)
  const editarProducto = async (id, current) => {
    // current = { name, price, imagen, description }
    const newName = prompt("Nuevo título:", current.name);
    if (newName === null) return; // Si cancela, salgo

    const newPrice = prompt("Nuevo precio:", current.price);
    if (newPrice === null) return;

    const newImagen = prompt("Nueva URL de imagen:", current.imagen);
    if (newImagen === null) return;

    const newDescription = prompt("Nueva descripción:", current.description);
    if (newDescription === null) return;

    try {
      const res = await fetch(`https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
          imagen: newImagen,
          description: newDescription
        })
      });

      if (!res.ok) throw new Error("Error en PUT");
      Swal.fire("¡Actualizado!", "El cómic se modificó correctamente.", "success");
      cargarProductos();
    } catch (err) {
      console.error("Error al editar producto:", err);
      Swal.fire("Error", "No se pudo actualizar el cómic.", "error");
    }
  };

  return (
    <div
      style={{
        color: "#dfec23",
        backgroundColor: "#0f3460",
        fontFamily: "Bangers",
        padding: "2rem",
        textAlign: "center"
      }}
    >
      <h1>⚡ Panel de Administrador</h1>

      {/* ===== Formulario para crear un cómic nuevo ===== */}
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <input
          name="name"
          placeholder="Título del cómic"
          value={nuevoProducto.name}
          onChange={manejarCambio}
          style={{
            marginRight: "8px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #dfec23",
            width: "20%"
          }}
        />
        <input
          name="price"
          placeholder="Precio"
          value={nuevoProducto.price}
          onChange={manejarCambio}
          style={{
            marginRight: "8px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #dfec23",
            width: "10%"
          }}
        />
        <input
          name="imagen"
          placeholder="URL de imagen"
          value={nuevoProducto.imagen}
          onChange={manejarCambio}
          style={{
            marginRight: "8px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #dfec23",
            width: "30%"
          }}
        />
        <input
          name="description"
          placeholder="Descripción"
          value={nuevoProducto.description}
          onChange={manejarCambio}
          style={{
            marginRight: "8px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #dfec23",
            width: "25%"
          }}
        />
        <button
          onClick={crearProducto}
          style={{
            backgroundColor: "#ffffff",
            color: "#0f3460",
            borderRadius: "8px",
            padding: "8px 12px",
            fontWeight: "bold"
          }}
        >
          + Agregar
        </button>
      </div>

      {/* ===== Lista de productos con imagen, nombre, precio y descripción ===== */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {productos.map((p) => (
          <li
            key={p.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              backgroundColor: "#1a1a2e",
              border: "1px solid #dfec23",
              margin: "0.5rem 0",
              padding: "1rem",
              borderRadius: "8px",
              color: "white"
            }}
          >
            {/* === Miniatura de la imagen === */}
            <div style={{ flex: "0 0 80px" }}>
              {p.imagen ? (
                <img
                  src={p.imagen}
                  alt={p.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #dfec23"
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#333",
                    color: "#dfec23",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    borderRadius: "4px"
                  }}
                >
                  Sin imagen
                </div>
              )}
            </div>

            {/* === Título, precio y descripción === */}
            <div style={{ flex: "1", textAlign: "left", marginLeft: "1rem" }}>
              <strong style={{ fontSize: "1.1rem" }}>{p.name}</strong>
              <p style={{ margin: "0.2rem 0" }}>💲{p.price}</p>
              <p style={{ fontSize: "0.9rem", color: "#ccc", margin: "0.2rem 0" }}>
                {p.description}
              </p>
            </div>

            {/* === Botones de acción (Editar / Eliminar) === */}
            <div style={{ flex: "0 0 160px", textAlign: "right" }}>
              <button
                onClick={() =>
                  editarProducto(p.id, {
                    name: p.name,
                    price: p.price,
                    imagen: p.imagen,
                    description: p.description
                  })
                }
                style={{
                  marginRight: "10px",
                  backgroundColor: "#ffffff",
                  color: "#0f3460",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  fontWeight: "bold"
                }}
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => eliminarProducto(p.id)}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0f3460",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  fontWeight: "bold"
                }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;


