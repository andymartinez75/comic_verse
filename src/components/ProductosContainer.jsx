import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./Card.jsx"


function ProductosContainer({functionCarrito}){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    

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

    function functionEnProductos(producto){
        functionCarrito(producto)
    }
    

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            
                <div className="productos-conteiner">
                    {productos.map((producto) => (
                        <Card
                            producto={producto}
                            funcionCarrito={functionEnProductos}
                        />
                    ))}
                </div>

            
        )
    }

    
}


export default ProductosContainer