import { useState, useEffect } from "react"
import { ItemCard } from "./ItemCard";
{/**Este componente se usara en ToggleTabs será una seccion dinamica en la pagina "buscar"*/}

export function SeccionSalones({busqueda}) {
    const [salones, setSalones] = useState([]);
    const buscarSalones = async () => {
        try {
            const salones = await fetch(`http://127.0.0.1:8000/api/salones/buscar/?q=${busqueda}`);
            const salonesData = await salones.json();
            if (salones.ok) {
                setSalones(salonesData);
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
        buscarSalones();
    }
    }, [busqueda]);


    return (
        <>
            {salones.map((salon) => (
                <ItemCard key={salon.id} imagenItem={salon.foto_url} nombre={salon.nombre_salon} descripcion={salon.ciudad + " | " + salon.direccion} id={salon.id} tipoElemento={"salon"}>
                    Publico: {salon.publico}
                </ItemCard>
            ))}

        </>
    )
}