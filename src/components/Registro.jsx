import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/registro.css";

const Registro = () => {
  const { registrarUsuario } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmarPassword) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }
    if (password !== confirmarPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    const exito = await registrarUsuario(email, password);
    if (exito) {
      Swal.fire("¡Registro exitoso!", "Ya puedes iniciar sesión.", "success");
      navigate("/login");
    } else {
      Swal.fire("Error", "Ese correo ya está registrado.", "error");
    }
  };

  return (
    <div className="registro-contenedor">
      <h2 className="registro-titulo">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <input
          type="email"
          placeholder="Email: tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña: Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña: Repetir contraseña"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
        />
        <button type="submit" className="registro-boton">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
