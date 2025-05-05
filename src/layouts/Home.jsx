import Footer from "../components/Footer"
import Header from "../components/Header"
import Main from "../components/Main"
import Nav from "../components/Nav"
import ProductosContainer from "../components/ProductosContainer"
/*import imagen2 from "../assets/fondoComic.jpg"*/

function Home() {
    /*const productos = [
        {
            id: 1,
            nombre: "Essence Mascara Lash Princess",
            descripcion: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            precio: 9.99,
            imagen: imagen2
        },
        {
            id: 2,
            nombre: "Eyeshadow Palette with Mirror",
            descripcion: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            precio: 19.99,
            imagen: imagen2
        },
        {
            id: 3,
            nombre: "Essence Mascara Lash Princess",
            descripcion: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            precio: 9.99,
            imagen: imagen2
        },
        {
            id: 4,
            nombre: "Eyeshadow Palette with Mirror",
            descripcion: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            precio: 19.99,
            imagen: imagen2
        },
        {
            id: 5,
            nombre: "Essence Mascara Lash Princess",
            descripcion: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            precio: 9.99,
            imagen: imagen2
        },
        {
            id: 6,
            nombre: "Essence Mascara Lash Princess",
            descripcion: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            precio: 9.99,
            imagen: imagen2
        }
    ]*/

    return(
        <div>
            <div>
                <Header/>
                <Nav/>
                <Main/>
                <ProductosContainer/>
                
            </div>
            <div>
                <Footer/>                
            </div>
        </div>
    )
}

export default Home