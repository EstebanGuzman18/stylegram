import { BotonAgregar } from "../../components/BotonAgregar"
import imagen from "../../assets/icons/agregar_producto.png"
import { useState, useEffect } from "react"
import { ItemCard } from "../../components/ItemCard";
import { FiX } from "react-icons/fi";

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const idSalon = JSON.parse(localStorage.getItem("user")).id;
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

    //eliminar producto
    const eliminarProducto = async (id) => {
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/api/productos/${id}/eliminar/`, {
                method: "DELETE"
            });
    
            if (respuesta.ok) {
                // quitar el producto del estado
                setProductos(prev =>
                    prev.filter(producto => producto.id_producto !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <BotonAgregar imagen={imagen} link={'/registrar-producto'}/>
        {productos.map((producto) => (
            <ItemCard key={producto.id_producto} imagenItem={producto.foto_url} nombre={producto.nombre} descripcion={producto.vendedor.nombre_salon + " | Disponible: " + producto.cantidad} id={producto.id_producto} tipoElemento={"productoVistaSalon"}>
                ${producto.precio}
                <FiX onClick={() => eliminarProducto(producto.id_producto)} className="cursor-pointer bg-red-500 text-white hover:bg-red-700 hover:scale-110 transition transform rounded-sm ml-5" size={30} title="Rechazar"/>
            </ItemCard>
        ))}
        </>
    )
}