import { useState, useEffect } from "react"
import { ItemCard } from "./ItemCard";

//Este conponente se usara en ToggleTabs será una seccion dinamica en la pagina "InfoSalon"
//obtiene todos los productos que tenga el salon y los muestra en forma de cards

export function SeccionProductosSalon({ idSalon }) {
    const [productos, setProductos] = useState([]);
    const buscarProductos = async () => {
        try {
            const productos = await fetch(`http://127.0.0.1:8000/api/productos/${idSalon}/salon/`);
            const productosData = await productos.json();
            if (productos.ok) {
                setProductos(productosData);
            }
            else {
                console.error("Error al buscar salones:", salonesData.error);
            }
        } catch (error) {
            console.error("Error al buscar salones:", error);
        }
    }

    useEffect(() => {
        buscarProductos();
    }, []);
    return (
         <>
            {productos.map((producto) => (
                <ItemCard key={producto.id_producto} imagenItem={producto.foto_url} nombre={producto.nombre} descripcion={producto.vendedor.nombre_salon + " | Disponible: " + producto.cantidad} id={producto.id_producto} tipoElemento={"producto"}>
                    ${producto.precio}
                </ItemCard>
            ))}
         </>
    )
}