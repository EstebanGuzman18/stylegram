import { useState, useRef } from "react"
import { ToggleTabs } from '../../components/ToggleTabs'
import { SeccionSalones } from '../../components/SeccionSalones'
import { SeccionProductos } from '../../components/SeccionProductos'
import buscarIcon from '../../assets/icons/buscar.png'

export default function Buscar() {
    const [busqueda, setBusqueda] = useState("");
    const inputRef = useRef();
    const cambiarBusqueda = (palabra) => {
        setBusqueda(palabra);
    };
    return (
        <>
        {/**Barra de búsqueda*/}
        <div className="mt-4">
            <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 border border-stylegram-tertiary">
                <input ref={inputRef} type="text" placeholder="Salones, productos y/o servicios" onKeyDown={(e) => {if (e.key === "Enter") {cambiarBusqueda(inputRef.current.value);}}} className="flex-1 outline-none text-lg" maxLength="50"/>
                <img src={buscarIcon} onClick={() => cambiarBusqueda(inputRef.current.value)} className="w-6 h-6 cursor-pointer hover:bg-blue-500"/>
            </div>
        </div>
        <ToggleTabs nombreSeccion1={"Salones"} nombreSeccion2={"Productos"} seccion1={<SeccionSalones busqueda={busqueda}/>} seccion2={<SeccionProductos busqueda={busqueda}/>} />
        </>
    )
}