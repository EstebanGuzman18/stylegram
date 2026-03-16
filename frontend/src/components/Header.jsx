
import { MenuDesplegable } from "./menuDesplegable"

{/**Este archivo tiene dos componentes: un header para paginas de registro que solo contendra el titulo
    y un header principal que tendra el logo y un menú desplegable*/}

export function HeaderRegistro({titulo}) {
    return (
        <header className='bg-stylegram-primary p-4 flex justify-center'>
            <h1 className="font-peralta text-white text-2xl md:text-3xl xl:text-4xl text-shadow-sm text-shadow-black">{titulo}</h1>
        </header>
    )

}

export function HeaderPrincipal({titulo}) {
    return (
        <header className="bg-stylegram-primary p-4 flex justify-center fixed w-full md:w-[75%] md:right-0 lg:w-[80%] z-30">
            <img src="/logo_stylegram.svg" alt="Logo de Stylegram" className="absolute h-20 w-20 -top-2 left-0 md:hidden"/>
            <h1 className="font-peralta text-white text-2xl md:text-3xl xl:text-4xl text-shadow-sm text-shadow-black">{titulo}</h1>
            <MenuDesplegable/>
        </header>
    )
}