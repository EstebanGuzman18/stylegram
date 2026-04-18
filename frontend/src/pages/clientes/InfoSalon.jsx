import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ToggleTabs } from '../../components/ToggleTabs'
import { SeccionFotos } from '../../components/SeccionFotos'
import { SeccionProductosSalon } from '../../components/SeccionProductosSalon'
import { FaCalendarPlus } from "react-icons/fa";
import fotoIcon from '../../assets/icons/foto_perfil.png'

export default function InfoSalon() {
    const { id } = useParams();

    // Obtener la información del salon
    const [salon, setSalon] = useState(null);
    const buscarSalon = async () => {
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/api/salones/${id}/`);
            const salonData = await respuesta.json();
            if (respuesta.ok) {
                setSalon(salonData);
            }
        } catch (error) {
            console.error("Error al buscar el salón:", error);
        }
    };

    // verificar si el salón tiene foto, si no usar la imagen por defecto
    const [imagen, setImagen] = useState(fotoIcon);
    const verificarImagen = () => {
        if (salon?.foto_url) {
            setImagen(salon.foto_url);
        }
    };

    // Obtenemos la lista de servicios del salon
    const [servicios, setServicios] = useState([]);
    const verificarServicios = () => {
        if (salon?.servicios) {
            setServicios(salon.servicios);
        }
    };

    useEffect(() => {
      buscarSalon();
    }, []);
    
    useEffect(() => {
      verificarImagen();
      verificarServicios();
    }, [salon]);


    return (
         <>
                {/**FOTO + NOMBRE*/}
                <section className="mt-4 flex justify-center">
                    <img src={imagen} alt="Foto del salón" className="w-25 h-25 rounded-md mr-12"/>
            
                    <div>
                        <h2 className="text-xl font-bold">{salon?.nombre_salon}</h2>
            
                        <p className="text-sm text-gray-600 -mt-1 mb-2">{salon?.nombre_estilista}</p>
            
                        <p className="text-stylegram-primary font-semibold">
                            Público objetivo: {salon?.publico}
                        </p>
                    </div>
                </section>
            
                {/**DESCRIPCIÓN*/}
                <section className="mt-4 flex justify-center">
                    <h3 className="text-stylegram-primary font-semibold">Descripción:</h3>
                    <p className="my-1 ml-3">
                        {salon?.descripcion}
                    </p>
                </section>
            
                {/**SERVICIOS + HORARIO*/}
                <section className="mt-5 flex justify-between">
                    {/**Servicios*/}
                    <div className="w-[50%]">
                        <h3 className="font-bold mr-20">Servicios:</h3>
                        <ul className="list-disc ml-5 text-sm">
                            {servicios.map((servicio, index) => (
                                <li key={index}>{servicio}</li>
                            ))}
                        </ul>
                    </div>
            
                    {/**Horario*/}
                    <div className="w-[50%]">
                        <h3 className="font-bold">Horario de atención</h3>
                        <p>{salon?.horario}</p>
                    </div>
                </section>

                {/**BOTÓN AGREGAR FOTO*/}
                <div className="mt-7 flex justify-center mb-7">
                    <Link to={`/solicitar-cita/${id}`} className="bg-stylegram-primary text-white shadow shadow-black px-6 py-2 rounded-lg flex items-center hover:bg-teal-700 cursor-pointer">
                        <FaCalendarPlus className="w-5 h-5 mr-2"/>
                        Solicitar cita
                    </Link>
        
                </div>
        
                <ToggleTabs nombreSeccion1={"Fotos"} nombreSeccion2={"Productos"} seccion1={<SeccionFotos/>} seccion2={<SeccionProductosSalon idSalon={id}/>}/>
                </>
    )
}