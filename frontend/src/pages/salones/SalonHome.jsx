import { ToggleTabs } from '../../components/ToggleTabs'
import { SeccionFotos } from '../../components/SeccionFotos'
import { SeccionResenas } from '../../components/SeccionResenas'
import { useRef } from 'react'
import imagenIcon from '../../assets/icons/imagen.png'
import fotoIcon from '../../assets/icons/foto_perfil.png'

export default function SalonHome() {
    const inputRef = useRef()
    return (
        <>
        {/**FOTO + NOMBRE + ESTRELLAS*/}
        <section className="mt-4 flex justify-center">
            <img src={fotoIcon} alt="Foto del salón" className="w-25 h-25 rounded-md mr-12"/>
    
            <div>
                <h2 className="text-xl font-bold">Nombre del salón</h2>
    
                <p className="text-sm text-gray-600 -mt-1">Nombre del estilista</p>
    
                <div className="flex text-yellow-400 text-xl -mt-1">
                    ★ ★ ★ ⯪ ☆
                </div>
    
                <p className="text-stylegram-primary font-semibold">
                    Público objetivo:
                </p>
            </div>
        </section>
    
        {/**DESCRIPCIÓN*/}
        <section className="mt-4 flex justify-center">
            <h3 className="text-stylegram-primary font-semibold">Descripción:</h3>
            <p className="my-1 ml-3">
                Aquí irá la descripción del salón. Este texto será reemplazado dinámicamente con
                la información real del negocio.
            </p>
        </section>
    
        {/**SERVICIOS + HORARIO*/}
        <section className="mt-5 flex justify-between">
            {/**Servicios*/}
            <div className="w-[50%]">
                <h3 className="font-bold mr-20">Servicios:</h3>
                <ul className="list-disc ml-5 text-sm">
                    <li>Aquí irá un servicio</li>
                    <li>Aquí irá otro</li>
                    <li>Y otro más…</li>
                </ul>
            </div>
    
            {/**Horario*/}
            <div className="w-[50%]">
                <h3 className="font-bold">Horario de atención</h3>
                <p>Aqui ira el horario de atencion <br/> establecido por el estilista</p>
            </div>
        </section>

        {/**BOTÓN AGREGAR FOTO*/}
        <div className="mt-5 flex justify-center mb-5">
            <button onClick={() => inputRef.current.click()} className="bg-stylegram-primary text-white shadow shadow-black px-6 py-2 rounded-lg flex items-center cursor-pointer">
                <img src={imagenIcon} className="w-6 h-6 mr-2"/>
                Agregar nueva
            </button>
            <input type="file" ref={inputRef} accept=".jpg,.jpeg,.png,.heic,.heif" className="hidden"/>

        </div>

        <ToggleTabs nombreSeccion1={"Fotos"} nombreSeccion2={"Reseñas"} seccion1={<SeccionFotos/>} seccion2={<SeccionResenas/>}/>
        </>
    )
}