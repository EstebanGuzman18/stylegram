{/**Este componente es la barra de nagegacion con la que los usuarios pueden navegar entre las diferentes paginas segun su rol */}

export function BarraNavegacion({children, paddingSuperior, estiloLogo}) {
    return (
        <nav className={`bg-stylegram-primary shadow-lg shadow-stylegram-tertiary fixed bottom-0 left-0 h-17 w-full md:h-full md:w-[25%] lg:w-[20%] ${paddingSuperior} z-40`}>
            <img src="/logo_stylegram.svg" alt="Logo de Stylegram" className={estiloLogo}/>
            <ul className="flex md:block">
                {children}
            </ul>
        </nav>
    )
}