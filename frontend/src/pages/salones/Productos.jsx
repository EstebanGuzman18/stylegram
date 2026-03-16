import { BotonAgregar } from "../../components/BotonAgregar"
import imagen from "../../assets/icons/agregar_producto.png"

export default function Productos() {
    return (
        <>
        <BotonAgregar imagen={imagen} link={'/registrar-producto'}/>
        <i>Aquí apareceran las fotos agregadas por el estilista</i>
        </>
    )
}