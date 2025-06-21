import { createContext, useContext, useEffect, useState } from "react";
const API_URL = "https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos";

const ProductsContext = createContext();
export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    const fetchProductos = async () => {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProductos(data);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

    const crearProducto = async (nuevoProducto) => {
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
    });
    fetchProductos();
};

    const editarProducto = async (id, productoEditado) => {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEditado),
    });
    fetchProductos();
};

    const eliminarProducto = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    fetchProductos();
};

    useEffect(() => {
    fetchProductos();
    }, []);

    return (
    <ProductsContext.Provider
        value={{
        productos,
        fetchProductos,
        crearProducto,
        editarProducto,
        eliminarProducto,
    }}
    >
    {children}
    </ProductsContext.Provider>
);
};
