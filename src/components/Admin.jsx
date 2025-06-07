import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "../styles/admin.css";

const API_URL = 'https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    price: '',
    imagen: '',
    description: ''
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const crearProducto = async () => {
    if (!nuevoProducto.name || !nuevoProducto.price || !nuevoProducto.imagen || !nuevoProducto.description) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });
      if (res.ok) {
        setNuevoProducto({ name: '', price: '', imagen: '', description: '' });
        fetchProductos();
        Swal.fire('Producto creado', '', 'success');
      }
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  const eliminarProducto = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchProductos();
        Swal.fire('Producto eliminado', '', 'success');
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  const editarProducto = async (producto) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar producto',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${producto.name}">
        <input id="swal-price" class="swal2-input" placeholder="Precio" value="${producto.price}">
        <input id="swal-imagen" class="swal2-input" placeholder="URL Imagen" value="${producto.imagen}">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Descripción">${producto.description}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('swal-name').value,
          price: document.getElementById('swal-price').value,
          imagen: document.getElementById('swal-imagen').value,
          description: document.getElementById('swal-description').value
        };
      },
      confirmButtonText: 'Guardar cambios',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });

    if (formValues) {
      try {
        await fetch(`${API_URL}/${producto.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues)
        });
        fetchProductos();
        Swal.fire('Producto actualizado', '', 'success');
      } catch (error) {
        console.error('Error al editar producto:', error);
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Panel de Administración</h2>

      <div className="formulario-crear">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={nuevoProducto.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Precio"
          value={nuevoProducto.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={nuevoProducto.imagen}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={nuevoProducto.description}
          onChange={handleChange}
        />
        <button className="btn-crear" onClick={crearProducto}>Crear producto</button>
      </div>

      <div className="productos-grid">
        {productos.map((prod) => (
          <div className="card-admin" key={prod.id}>
            <img src={prod.imagen} alt={prod.name} />
            <h3>{prod.name}</h3>
            <p><strong>Precio:</strong> ${prod.price}</p>
            <p>{prod.description}</p>
            <div className="acciones">
              <button className="btn-editar" onClick={() => editarProducto(prod)}>Editar</button>
              <button className="btn-eliminar" onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;



