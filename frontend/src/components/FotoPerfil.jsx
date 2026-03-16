import { useState, useRef } from "react"
import fotoPerfilIcon from "../assets/icons/foto_perfil.png"

/** Componente para seleccionar y previsualizar una imagen.
 * Se utiliza en el registro de clientes y salones.
 */

export function FotoPerfil() {
    //  Manejo de la carga y vista previa de la foto principal
    const [fotoPerfil, setFoto] = useState(fotoPerfilIcon)
    const inputFoto = useRef()
    const cambiarFoto = (e)=> {
        const nuevaFoto = e.target.files[0]
        if (!nuevaFoto) {
        return
        }
        const permitidos = ["image/jpeg","image/jpg","image/png","image/heic","image/heif"
        ]
    
        if (!permitidos.includes(nuevaFoto.type)) {
            alert("Formato no permitido. Selecciona una imagen válida.")
            e.target.value = ""
            return
        }
    
        if (nuevaFoto.size > 2 * 1024 * 1024) {
            alert("La imagen supera los 2MB")
            e.target.value = ""
            return
        }
     
        const foto = URL.createObjectURL(nuevaFoto)
        setFoto(foto)

    }
    return (
        <div className="absolute top-3 lg:top-1/2 left-1/2 -translate-x-1/2 lg:-translate-y-1/2 flex flex-col items-center">
            <input  ref={inputFoto} type="file" accept=".jpg,.jpeg,.png,.heic,.heif" onChange={cambiarFoto} className="hidden"/>
            <img src={fotoPerfil} alt="Imagen de perfil" onClick={()=>inputFoto.current.click()} className="h-25 w-25 md:h-30 md:w-30 rounded-full cursor-pointer"/>
            <h3 className="font-serif">Foto de perfil</h3>
        </div>
    )
}