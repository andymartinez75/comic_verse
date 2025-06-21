import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [productosCarrito, setProductosCarrito] = useState([]);

  const agregarAlCarrito = (nuevoProducto) => {
    setProductosCarrito((prev) => {
      const existente = prev.find(p => p.id === nuevoProducto.id);
      if (existente) {
        return prev.map(p =>
          p.id === nuevoProducto.id
            ? { ...p, cantidad: p.cantidad + nuevoProducto.cantidad }
            : p
        );
      }
      return [...prev, nuevoProducto];
    });
  };

  const borrarDelCarrito = (id) => {
    setProductosCarrito((prev) => prev.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => setProductosCarrito([]);

  const aumentarCantidad = (id) => {
    setProductosCarrito((prev) =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const reducirCantidad = (id) => {
    setProductosCarrito((prev) =>
      prev.map(p =>
        p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        productosCarrito,
        agregarAlCarrito,
        borrarDelCarrito,
        vaciarCarrito,
        aumentarCantidad,
        reducirCantidad
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
