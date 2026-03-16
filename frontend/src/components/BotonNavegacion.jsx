import { NavLink } from "react-router-dom"

{/**
 * Este componente representa los botones de la barra de navegación.
 * Existen dos variantes: BotonNavegacion y BotonHome (con diseño diferente).
 *
 * Estructura:
 * - <li> envuelve todo el contenido, ya que será usado dentro de un <ul>
 *   en el componente BarraNavegacion.
 * - Dentro del <li> se usa <NavLink>, que permite navegar entre rutas
 *   y detectar si la ruta está activa mediante la propiedad isActive.
 *
 * - El primer <div> es el contenedor principal del botón.
 * - El segundo <div> es el círculo donde se muestra la imagen.
 *
 * Usando isActive se aplican clases condicionales para cambiar el
 * color de fondo tanto del contenedor como del círculo cuando
 * la ruta está activa.
 */}

export function BotonNavegacion({link, ancho, imagen, descripcionImagen, titulo}) {
    return (
        <li className={`${ancho} h-17 md:w-full md:h-11 md:mb-12 md:border-y md:border-stylegram-secondary`}>
            <NavLink to={link}>
                {({isActive}) =>
                <div className={`flex items-center justify-center w-full h-full cursor-pointer hover:bg-teal-500 ${isActive ? "bg-teal-600" : "bg-stylegram-primary"}`}>
                    <div className={`border-2 border-stylegram-secondary rounded-2xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center ${isActive ? "bg-teal-600" : "bg-stylegram-primary"} bg-stylegram-primary md:-translate-x-15 xl:-translate-x-20 fixed`}>
                        <img src={imagen} alt={descripcionImagen} className="w-8 h-8"/>
                    </div>
                    <h4 className="hidden md:block font-platypi text-lg text-white text-shadow-md text-shadow-black translate-x-10">{titulo}</h4>
                </div>
                }
                
            </NavLink>
        </li>
        
    )
}

export function BotonHome({link, ancho, imagen, descripcionImagen, titulo}) {
    return (
            <li className={`${ancho} h-17 md:w-full md:h-15 md:mb-12 md:border-y md:border-stylegram-secondary `}> 
                <NavLink to={link}>
                    {({isActive}) =>
                    <div className={`w-full h-full flex items-center justify-center cursor-pointer hover:bg-teal-500 ${isActive ? "bg-teal-600" : "bg-stylegram-primary"}`}>
                        <div className={`border-3  border-stylegram-secondary rounded-full w-19 h-19 md:w-21 md:h-21 flex items-center justify-center -translate-y-1 md:translate-y-0 md:-translate-x-15 xl:-translate-x-20 fixed ${isActive ? "bg-teal-600" : "bg-stylegram-primary"}`}> 
                            <img src={imagen} alt={descripcionImagen} className="w-14 h-14"/> 
                        </div> 
                        <h4 className="hidden md:block font-platypi text-lg text-white text-shadow-md text-shadow-black translate-x-10">{titulo}</h4> 
                    </div>
                    }
                </NavLink>
            </li>
        
    )
}