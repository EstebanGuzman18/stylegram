import { useState } from "react"

{/**Componente reutilizable que permite alternar entre dos opciones de contenido, mostrando visualmente cuál 
se encuentra activa.*/}

export function ToggleTabs({nombreSeccion1, nombreSeccion2, seccion1, seccion2}) {
    const [seccion, setSeccion] = useState(1)
    const [estiloBoton1, setEstiloBoton1] = useState("bg-stylegram-primary text-white")
    const [estiloBoton2, setEstiloBoton2] = useState("bg-gray-300 text-black")

    const cambiarBoton1 = () => {
        setSeccion(1)
        setEstiloBoton1("bg-stylegram-primary text-white")
        setEstiloBoton2("bg-gray-300 text-black")
    }
    const cambiarBoton2 = () => {
        setSeccion(2)
        setEstiloBoton1("bg-gray-300 text-black")
        setEstiloBoton2("bg-stylegram-primary text-white")
    }
    return (
        <>
        <div className="mt-4 flex justify-center">
            <button onClick={cambiarBoton1} className={`${estiloBoton1} px-6 py-2 rounded-l-full font-platypi font-semibold w-45 md:w-60 xl:w-75 text-center cursor-pointer`}>
                {nombreSeccion1}
            </button>
    
            <button onClick={cambiarBoton2} className={`${estiloBoton2} px-6 py-2 rounded-r-full font-platypi font-semibold w-45 md:w-60 xl:w-75 text-center cursor-pointer`}>
                {nombreSeccion2}
            </button>
        </div>
        <section className="mt-8 border-t pt-5">
            {seccion === 1 ? seccion1 : seccion2}
        </section>
        </>
    )
}