import { Link } from 'react-router-dom'

{/**Este componente es el boton que ira en las paginas productos y recordar pagos, 
    Su funcion es abrir el formulario para registrar un nuevo producto o pago */}

export function BotonAgregar({imagen, link}) {
    return (
        <div className="mt-5 flex justify-center mb-7">
            <Link to={link} className="bg-stylegram-primary text-white font-semibold shadow shadow-black px-6 py-2 rounded-lg flex items-center cursor-pointer">
                <img src={imagen} className="w-7 h-7 mr-2"/>
                Agregar nuevo
            </Link>
        </div>
    )
}