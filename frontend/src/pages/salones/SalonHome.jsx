import { ToggleTabs } from '../../components/ToggleTabs'
import { SeccionFotos } from '../../components/SeccionFotos'
import { SeccionResenas } from '../../components/SeccionResenas'
import { useRef, useState, useEffect } from 'react'
import imagenIcon from '../../assets/icons/imagen.png'
import fotoIcon from '../../assets/icons/foto_perfil.png'

export default function SalonHome() {
    const inputRef = useRef()

    //Obtenemos la información del salón desde el localStorage
    const salon = JSON.parse(localStorage.getItem("user"))

    // Verificar si el salón tiene foto de perfil, si no usar la imagen por defecto
    const [fotoPerfil, setFotoPerfil] = useState(fotoIcon)
    const cambiarFotoPerfil = () => {
        if (salon?.foto_url) {
            setFotoPerfil(salon.foto_url);
        }
    }

    // Obtenemos la lista de servicios del salon
    const [servicios, setServicios] = useState([]);
    const verificarServicios = () => {
        if (salon?.servicios) {
            setServicios(salon.servicios);
        }
    };

    useEffect(() => {
        cambiarFotoPerfil();
        verificarServicios();
    }, []);

    return (
        <>
        {/**FOTO + NOMBRE*/}
        <section className="mt-4 flex justify-center">
            <img src={fotoPerfil} alt="Foto del salón" className="w-25 h-25 rounded-md mr-12"/>
    
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
            <button onClick={() => inputRef.current.click()} className="bg-stylegram-primary text-white shadow shadow-black px-6 py-2 rounded-lg flex items-center cursor-pointer">
                <img src={imagenIcon} className="w-6 h-6 mr-2"/>
                Agregar imagen a tu galeria
            </button>
            <input type="file" ref={inputRef} accept=".jpg,.jpeg,.png,.heic,.heif" className="hidden"/>

        </div>

        <ToggleTabs nombreSeccion1={"Fotos"} nombreSeccion2={"Reseñas"} seccion1={<SeccionFotos/>} seccion2={<SeccionResenas/>}/>
        </>
    )
}