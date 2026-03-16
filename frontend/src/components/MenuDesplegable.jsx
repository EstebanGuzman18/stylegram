import menuDesplegable from "../assets/icons/menu.png"
import editarIcon from "../assets/icons/editar_info.png"
import cerrarSesionIcon from "../assets/icons/cerrar_sesion.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

{/**Este componente es el menú desplegable que va ubicado en el header tiene dos botones uno para editar perfil y otro para cerrar sesion*/}

export function MenuDesplegable() {
    const [menuAbierto, setMenu] = useState(false)
    const cerrarSesion = useNavigate("/")
    return (
        <>
        <img src={menuDesplegable} alt="Menú desplegable" onClick={()=>{setMenu(!menuAbierto)}} className="absolute h-18 w-17 -top-1 right-0 cursor-pointer"/>
        <div className={`fixed top-15 right-0 w-40 bg-stylegram-secondary text-stylegram-tertiary ${menuAbierto ? "shadow-2xl" : "shadow-0 translate-x-40 -translate-y-24"} transition-transform duration-500`}>
            <ul className="p-4 space-y-4 text-lg">
                <li className="cursor-pointer hover:text-stylegram-primary border-y-2 border-stylegram-primary flex font-platypi"> 
                    <img src={editarIcon} alt="Editar mi información" className="h-6 w-6 mr-2"/>
                    Editar
                </li>
                <li onClick={()=>{cerrarSesion()}} className="cursor-pointer hover:text-stylegram-primary border-y-2 border-stylegram-primary flex font-platypi"> 
                    <img src={cerrarSesionIcon} alt="Cerrar sesion" className="h-7 w-7 mr-2"/>
                    Salir
                </li>
            </ul>
        </div>
        </>
    )
}