import "../styles/Carrito.css"

function CarritoCard({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return(
        <div className="carrito-card" >
            <h3 className="carrito-titulo" style={{color:"white"}}>{producto.name}</h3>
            {<p className="descripcion-carrito" style={{color:"white"}}>{producto.description}</p>}
            <img className="carrito-image" src={producto.imagen}></img>
            <span style={{color:"white"}}>{producto.cantidad}</span>
            <div>
                <p style={{color:"white"}}>Precio unitario</p>
                <span style={{color:"white"}}>{producto.price} $</span>
            </div>
            <div>
                <p style={{color:"white"}}>Precio total</p>
                <span style={{color:"white"}}>{producto.cantidad * producto.price} $</span>
            </div>

            <button className="boton-carrito" onClick={borrarDelCarrito} style={{backgroundColor: "yellow" ,color:"black"}}>X</button>
        </div>
    )
}

export default CarritoCard