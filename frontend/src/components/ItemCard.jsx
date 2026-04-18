import { useEffect, useState } from "react";
import imagenDefecto from "../assets/icons/foto_perfil.png";
import { Link } from "react-router-dom";

//este componente se usará para representar cada elemento del sistema ya sea salon, cita o producto
//tiene una imagen, un nombre, una descripción y un espacio para botones de acción (children)

export function ItemCard({ imagenItem, nombre, descripcion, id, tipoElemento, children }) {
    const [imagen, setImagen] = useState(imagenDefecto);
    useEffect(() => {
        if (imagenItem) {
            setImagen(imagenItem);
        }
    }, [imagenItem]);

    const [paginaDestino, setPaginaDestino] = useState("#");
    const determinarPaginaDestino = () => {
        if (tipoElemento === "salon") {
            setPaginaDestino(`/info-salon/${id}`);
        }
         else if (tipoElemento === "producto") {
            setPaginaDestino(`/info-producto/${id}`);
        }
    };
    useEffect(() => {
        determinarPaginaDestino();
    }, []);


    return (
        <Link to={paginaDestino} className="flex items-center gap-4 p-2 mb-2 border rounded-xl shadow-sm bg-white cursor-default hover:bg-teal-50">

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

        </Link>
    );
}