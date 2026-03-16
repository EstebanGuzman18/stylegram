import { Outlet, useMatches } from "react-router-dom"
import { HeaderPrincipal } from "../components/Header"
import { BarraNavegacion } from "../components/BarraNavegacion"
import { BotonNavegacion } from "../components/BotonNavegacion"
import { BotonHome } from "../components/BotonNavegacion"
import citasIcon from "../assets/icons/citas.png"
import productosIcon from "../assets/icons/productos.png"
import homeIcon from "../assets/icons/home.png"
import finanzasIcon from "../assets/icons/finanzas.png"
import programarPagosIcon from "../assets/icons/programar_pagos.png"

export default function LayoutSalon() {
    const matches = useMatches()
    const currentMatch = matches[matches.length -1]
    const titulo = currentMatch?.handle?.titulo
    const anchoBoton = "w-1/5"

    return (
        <>
        <HeaderPrincipal titulo={titulo}/>
        <main className="pt-18 px-3 md:pl-65 xl:pl-80">
            <Outlet/>
        </main>
        <BarraNavegacion paddingSuperior="md:pt-55" estiloLogo="absolute h-40 w-40  xl:h-45 xl:w-45 top-7 xl:top-3 md:left-1/2 md:-translate-x-1/2 hidden md:block">
            <BotonNavegacion link="/citas" ancho={anchoBoton}  imagen={citasIcon} descripcionImagen="citas" titulo="Citas"/>
            <BotonNavegacion link="/productos" ancho={anchoBoton}  imagen={productosIcon} descripcionImagen="productos" titulo="Productos"/>
            <BotonHome link="/salon-home" ancho={anchoBoton}  imagen={homeIcon} descripcionImagen="home" titulo="Inicio"/>
            <BotonNavegacion link="/finanzas" ancho={anchoBoton} imagen={finanzasIcon} descripcionImagen="finanzas" titulo="Finanzas"/>
            <BotonNavegacion link="/programar-pagos" ancho={anchoBoton} imagen={programarPagosIcon} descripcionImagen="recordar pagos" titulo="Recordar pagos"/>
        </BarraNavegacion>
        </>
    )
}