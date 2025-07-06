import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from "./context/ProductsContext";
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
    <ProductsProvider>
    <AuthProvider>
      <CartProvider>

      <App />
      
      </CartProvider>
      </AuthProvider>
      </ProductsProvider>
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

