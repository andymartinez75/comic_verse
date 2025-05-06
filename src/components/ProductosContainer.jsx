import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./Card.jsx"


function ProductosContainer(){
    const [productos, setProductos] = useState([])
    const [productosCarrito, setProductosCarrito] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0)

    {useEffect(() => {
        fetch('https://6817f7ec5a4b07b9d1cda7c7.mockapi.io/productos')
            .then((respuesta) =>
                respuesta.json()
            )
            .then((datos) => {
                console.log(datos)
                setProductos(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);}
    function funcionCarrito(producto){
        const existe = productosCarrito.find(p => p.id === producto.id);
        console.log(existe)
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id){
                    const productoActualizado = {...p, cantidad: p.cantidad + producto.cantidad}
                    return productoActualizado
                }else{
                    return p
                }
            })
            setProductosCarrito(carritoActualizado)
        }else{
            
            const nuevoCarrito = [...productosCarrito, producto];
            setProductosCarrito(nuevoCarrito)
        }
        setTotal(0)
        productosCarrito.map((p => {
            setTotal(total + p.price * p.cantidad)
        }))

    }

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div>
                <div className="productos-conteiner">
                    {productos.map((producto) => (
                        <Card
                            producto={producto}
                            funcionCarrito={funcionCarrito}
                        />
                    ))}
                </div>
    {            <div>
                    <Carrito
                        productosCarrito={productosCarrito}
                        total={total}    
                    />
                </div>}
            </div>
        )
    }

    
}


export default ProductosContainer