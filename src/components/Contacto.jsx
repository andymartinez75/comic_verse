import React,{ useState } from 'react'
import '../styles/contacto.css';

function Contacto () {

    const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
});

const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();

    
    alert('Formulario enviado con éxito');
    console.log(formulario);

    // Reiniciar campos
    setFormulario({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    });
};

return (
    <div className='contacto'>
    <h1>Contacto</h1>
    <form onSubmit={handleSubmit} className="formulario-contacto">
        <label>
        Nombre:
        <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
        />
        </label>

        <label>
        Email:
        <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            required
        />
        </label>

        <label>
        Asunto:
        <input
            type="text"
            name="asunto"
            value={formulario.asunto}
            onChange={handleChange}
            required
        />
        </label>

        <label>
        Mensaje:
        <textarea
            name="mensaje"
            value={formulario.mensaje}
            onChange={handleChange}
            required
        />
        </label>

        <button type="submit">Enviar</button>
    </form>
    </div>
);
}


export default Contacto;