import "../styles/Carrito.css"

function CarritoCard({producto, funcionDisparadora ,aumentarCantidad , reducirCantidad}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }
    

    return(
        <div className="carrito-card" >
            <h3 className="carrito-titulo" style={{color:"white"}}>{producto.name}</h3>
            <p className="descripcion-carrito" style={{color:"white"}}>{producto.description}</p>
            <img className="carrito-image" src={producto.imagen}></img>

            <div className="cantidad-control">
                <button onClick={() => reducirCantidad(producto.id)}>-</button>
                <span style={{ color: "white", margin: "0 10px" }}>{producto.cantidad}</span>
                <button onClick={() => aumentarCantidad(producto.id)}>+</button>
            </div>
            <div>
                <p style={{color:"white"}}>Precio unitario</p>
                <span style={{color:"white"}}>{producto.price} $</span>
            </div>
            <div>
                <p style={{color:"white"}}>Precio total</p>
                <span style={{color:"white"}}>{(producto.cantidad * producto.price).toFixed(2)}$</span>
            </div>

            <button className="boton-carrito" onClick={borrarDelCarrito} style={{backgroundColor: "yellow" ,color:"black"}}>X</button>
        </div>
    )
}

export default CarritoCard