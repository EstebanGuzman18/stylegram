import { ToggleTabs } from '../../components/ToggleTabs'
import { SeccionSalones } from '../../components/SeccionSalones'
import { SeccionProductos } from '../../components/SeccionProductos'
import buscarIcon from '../../assets/icons/buscar.png'

export default function Buscar() {
    return (
        <>
        {/**Barra de búsqueda*/}
        <div className="mt-4">
            <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2 border border-stylegram-tertiary">
                <input type="text" placeholder="Salones, productos y/o servicios" className="flex-1 outline-none text-lg" maxLength="50"/>
                <img src={buscarIcon} className="w-6 h-6 cursor-pointer"/>
            </div>
        </div>
        <ToggleTabs nombreSeccion1={"Salones"} nombreSeccion2={"Productos"} seccion1={SeccionSalones} seccion2={SeccionProductos}/>
        </>
    )
}