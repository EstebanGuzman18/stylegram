import { useEffect, useState } from "react";
import imagenDefecto from "../assets/icons/foto_perfil.png";

//este componente se usará para representar cada elemento del sistema ya sea salon, cita o producto
//tiene una imagen, un nombre, una descripción y un espacio para botones de acción (children)

export default function ItemCard({ imagenItem, nombre, descripcion, children }) {
    const [imagen, setImagen] = useState(imagenDefecto);
    useEffect(() => {
        if (imagenItem) {
            setImagen(imagenItem);
        }
    }, [imagenItem]);
    return (
        <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-white">

            {/*  Imagen */}
            <div className="w-20 h-20 flex shrink-0">
                <img 
                    src={imagen} 
                    alt={nombre} 
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/*  Información */}
            <div className="flex flex-col grow">
                <h3 className="font-semibold text-lg">{nombre}</h3>
                <p className="text-gray-500 text-sm">{descripcion}</p>
            </div>

            {/*  Acciones (children) */}
            <div className="flex items-center">
                {children}
            </div>

        </div>
    );
}