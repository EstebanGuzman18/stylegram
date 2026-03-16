import { Link } from "react-router-dom"

[/**Este componente va en la parte inferior de los formularios de registro tanto de cliente como de salón,
    tiene el botón de registrarse y otro que lo redirige al login en caso de ya tener cuenta */]

export function AccionesRegistro({espacioLg, linkLogin}) {
    return (
        <div className={`flex flex-col absolute left-1/2 bottom-8 md:bottom-6 ${espacioLg} -translate-x-1/2`}>
            <button type="submit" className="bg-black text-white font-platypi rounded-lg w-30 md:w-32 lg:w-33 h-8 md:h-9 lg:h-10 hover:bg-gray-400 hover:text-black transition mb-2">Registrarse</button>
            <Link to={linkLogin} className="text-sm text-gray-700 underline hover:text-stylegram-primary transition">Ya tengo una cuenta</Link>
        </div>
    )
}