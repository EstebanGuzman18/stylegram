import { Link } from "react-router-dom";
{/*Este componente crea los botones para iniciar sesion y/o registrarse que se usaran en el Home*/}

export function BotonPrincipal({link, nombre, color, texto}) {
    return (
        <Link to={link}
            className={`${color} rounded-md h-10 w-40 lg:h-11 lg:w-42 xl:h-12 xl:w-44 font-platypi ${texto} flex items-center justify-center hover:bg-gray-300 transition`}>{nombre}</Link>
    )
}