import { useState, useEffect } from "react"
import { ItemCard } from "./ItemCard";

{/**Este componente se usara en ToggleTabs será una seccion dinamica en la pagina "buscar"*/}

export function SeccionProductos({busqueda}) {
    const [productos, setProductos] = useState([]);
    const buscarProductos = async () => {
        try {
            const productos = await fetch(`http://127.0.0.1:8000/api/productos/buscar/?q=${busqueda}`);
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
    if (busqueda.trim() !== "") {
        buscarProductos();
    }
    }, [busqueda]);
    return (
         <>
            {productos.map((producto) => (
                <ItemCard key={producto.id_producto} imagenItem={producto.foto_url} nombre={producto.nombre} descripcion={producto.vendedor.nombre_salon + " | Disponible: " + producto.cantidad}>
                    $ {producto.precio}
                </ItemCard>
            ))}

        </>
    )
}