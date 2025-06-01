import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
    await signInWithEmailAndPassword(auth, email, password);
    Swal.fire({
        title: "Bienvenido",
        text: "Has iniciado sesión correctamente",
        icon: "success",
        background: "#0f3460",
        color: "#dfec23"
    });
      navigate("/"); // Redirige a la página principal (o /admin si preferís)
    } catch (error) {
    console.log(error.code, error.message);
    Swal.fire({
        title: "Error",
        text: "Email o contraseña incorrectos",
        icon: "error",
        background: "#0f3460",
        color: "#dfec23"
    });
    }
};

useEffect(() => {
    if (usuario) {
      navigate("/"); // Si ya está logueado, redirige automáticamente
    }
}, [usuario, navigate]);

    return (
    <div className="login-form">
    <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <button type="submit">Ingresar</button>
    </form>
    </div>
);
};

export default Login;

