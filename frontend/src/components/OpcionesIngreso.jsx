import { BotonPrincipal } from "./BotonPrincipal"

{/*En este componente se muestran las opciones para ingresar a tu cuenta o crear una nueva (Iniciar sesión/Registrarse)
    Será reutilizado tanto para clientes y estilistas*/}

export function OpcionesIngreso({titulo, colorFondo, colorBoton, linkRegistro, linkLogin}) {
    return (
        <section className={`${colorFondo} w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center flex-col`}>
            <h1 className="font-peralta text-2xl lg:text-3xl xl:text-4xl">{titulo}</h1> <br/> <br/>
            <BotonPrincipal link={linkLogin} nombre="Iniciar sesión" color={colorBoton} texto="text-black"/> <br/>
            <BotonPrincipal link={linkRegistro} nombre="Registrarse" color="bg-stylegram-tertiary" texto="text-white" />
            
        </section>
    )
}