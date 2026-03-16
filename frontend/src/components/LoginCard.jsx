import { Link } from "react-router-dom"
{/**Este componente tiene los campos para iniciar sesion, se reutilizará tanto en el login del cliente como del salón*/}

export function LoginCard({linkRegistro, linkOlvideContraseña}) {
    return (
        <div className="bg-stylegram-primary rounded-2xl w-[94%] sm:w-[65%] md:w-[50%] lg:w-[35%] xl:w-[30%] px-9 pb-3 pt-18 relative">
            <img src="logo_stylegram.svg" alt="Logo Stylegram" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-33 h-33"/>
            <form id="formulario" className="flex flex-col">
                <label htmlFor="correo" className="text-lg font-serif">Correo electronico</label>
                <input type="email" id="correo" className="mt-1 bg-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-700 px-2 py-1" maxLength="40" required/>
                <label htmlFor="contraseña" className="text-lg font-serif">Contraseña</label>
                <input type="password" id="contraseña" className="mt-1 bg-white rounded-md mb-8 focus:outline-none focus:ring-2 focus:ring-teal-700 px-2 py-1" maxLength="20" required/>
                <button type="submit" className="bg-black text-white rounded-md w-30 py-1 hover:bg-gray-300 hover:text-black transition self-center mb-3 font-platypi cursor-pointer">Entrar</button>
                <Link to={linkOlvideContraseña} className="self-center underline text-sm text-gray-800 hover:text-gray-100">Olvidé mi contraseña</Link>
                <Link to={linkRegistro} className="self-center underline text-sm text-gray-800 hover:text-gray-100">Registrarme</Link>
            </form>
    
        </div>
    )
}