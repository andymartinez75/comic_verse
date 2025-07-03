import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useProductsContext } from '../context/ProductsContext';
import '../styles/admin.css';

const Admin = () => {
  const { productos, crearProducto, editarProducto, eliminarProducto } = useProductsContext();

  const [nuevoProducto, setNuevoProducto] = useState({ name: '', price: '', imagen: '', description: '' });
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  const productosFiltrados = productos.filter((prod) =>
    prod.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosEnPagina = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    const { name, price, imagen, description } = nuevoProducto;

    if (!name || !price || !imagen || !description) {
      toast.warn('Por favor completa todos los campos.');
      return;
    }

    if (!name.trim() || name.length < 3) {
      toast.warn('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      toast.warn('El precio debe ser un número válido.');
      return;
    }

    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    if (!urlRegex.test(imagen)) {
      toast.warn('La imagen debe ser una URL válida.');
      return;
    }

    if (!description.trim() || description.length < 10) {
      toast.warn('La descripción debe tener al menos 10 caracteres.');
      return;
    }

    await crearProducto(nuevoProducto);
    setNuevoProducto({ name: '', price: '', imagen: '', description: '' });
    toast.success('Producto creado exitosamente');
  };

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      await eliminarProducto(id);
      toast.success('Producto eliminado');
    }
  };

  const handleEditar = async (producto) => {
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
      const { name, price, imagen, description } = formValues;

      if (!name.trim() || name.length < 3) {
        toast.warn('El nombre debe tener al menos 3 caracteres.');
        return;
      }

      if (isNaN(price) || Number(price) <= 0) {
        toast.warn('Precio inválido');
        return;
      }

      const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
      if (!urlRegex.test(imagen)) {
        toast.warn('URL de imagen inválida');
        return;
      }

      if (!description.trim() || description.length < 10) {
        toast.warn('Descripción demasiado corta');
        return;
      }

      await editarProducto(producto.id, formValues);
      toast.success('Producto actualizado');
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Panel de Administración</h2>

      <div className="formulario-crear">
        <input type="text" name="name" placeholder="Nombre" value={nuevoProducto.name} onChange={handleChange} />
        <input type="text" name="price" placeholder="Precio" value={nuevoProducto.price} onChange={handleChange} />
        <input type="text" name="imagen" placeholder="URL de la imagen" value={nuevoProducto.imagen} onChange={handleChange} />
        <input type="text" name="description" placeholder="Descripción" value={nuevoProducto.description} onChange={handleChange} />
        <button className="btn-crear" onClick={handleCrear}>Crear producto</button>
      </div>

      <div className="buscador">
        <input type="text" placeholder="Buscar por nombre..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="input-busqueda" />
      </div>

      <div className="productos-grid">
        {productosEnPagina.map((prod) => (
          <div className="card-admin" key={prod.id}>
            <img src={prod.imagen} alt={prod.name} />
            <h3>{prod.name}</h3>
            <p><strong>Precio:</strong> ${prod.price}</p>
            <p>{prod.description}</p>
            <div className="acciones">
              <button className="btn-editar" onClick={() => handleEditar(prod)}>Editar</button>
              <button className="btn-eliminar" onClick={() => handleEliminar(prod.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINADOR */}
      {totalPaginas > 1 && (
        <div className="paginador">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={paginaActual === i + 1 ? 'pagina-activa' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;




