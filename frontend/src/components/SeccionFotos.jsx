import { useRef } from 'react'
import imagenIcon from '../assets/icons/imagen.png'

{/**Este componente se usara en ToggleTabs será una seccion dinamica en la pagina "SalonHome"*/}

export function SeccionFotos() {
    const inputRef = useRef()
    return (
        <> 
            {/**BOTÓN AGREGAR FOTO*/}
            <div className="mt-5 flex justify-center mb-5">
                <button onClick={() => inputRef.current.click()} className="bg-stylegram-primary text-white shadow shadow-black px-6 py-2 rounded-lg flex items-center cursor-pointer">
                    <img src={imagenIcon} className="w-6 h-6 mr-2"/>
                    Agregar nueva
                </button>
                <input type="file" ref={inputRef} accept=".jpg,.jpeg,.png,.heic,.heif" className="hidden"/>
    
            </div> <i>Aquí apareceran las fotos agregadas por el estilista</i>
        </>
    )
}