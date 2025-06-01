import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegistro = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
    await createUserWithEmailAndPassword(auth, email, password);
    Swal.fire({
        title: "Cuenta creada",
        text: "¡Tu cuenta fue registrada con éxito!",
        icon: "success",
        background: "#0f3460",
        color: "#dfec23",
    });
    navigate("/login");
    } catch (error) {
    console.log(error.code, error.message);
    Swal.fire({
        title: "Error al registrar",
        text: "Revisá el correo o la contraseña (mínimo 6 caracteres)",
        icon: "error",
        background: "#0f3460",
        color: "#dfec23",
    });
    }
};

return (
    <div className="login-form">
    <form onSubmit={handleRegistro}>
        <h2>Crear cuenta</h2>
        <p style={{ textAlign: "center", marginBottom: "20px", fontStyle: "italic" }}>
        Bienvenido a ComicVerse
        </p>

        <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Contraseña (mínimo 6 caracteres)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <button type="submit">Registrarse</button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" style={{ color: "#dfec23", fontWeight: "bold" }}>
            Iniciá sesión
        </Link>
        </p>
    </form>
    </div>
);
};

export default Registro;
