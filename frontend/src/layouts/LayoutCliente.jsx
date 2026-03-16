import { Outlet, useMatches } from "react-router-dom"
import { HeaderPrincipal } from "../components/Header"
import { BarraNavegacion } from "../components/BarraNavegacion"
import { BotonNavegacion, BotonHome } from "../components/BotonNavegacion"
import buscarIcon from "../assets/icons/buscar.png"
import homeIcon from "../assets/icons/home.png"
import favoritosIcon from "../assets/icons/favoritos.png"

export default function LayoutCliente() {
    const matches = useMatches()
    const currentMatch = matches[matches.length-1]
    const titulo = currentMatch?.handle?.titulo
    const anchoBoton = "w-1/3"
    return (
        <>
        <HeaderPrincipal titulo={titulo}/>
        <main className="pt-18 px-3 md:pl-65 xl:pl-80">
            <Outlet/>
        </main>
        <BarraNavegacion paddingSuperior={"md:pt-80"} estiloLogo={"absolute h-50 w-50  xl:h-55 xl:w-55 top-10 md:left-1/2 md:-translate-x-1/2 hidden md:block"}>
        <BotonNavegacion link={"/buscar"} ancho={anchoBoton} imagen={buscarIcon} descripcionImagen={"Buscar"} titulo={"Buscar"}/>
        <BotonHome link={"/cliente-home"} ancho={anchoBoton} imagen={homeIcon} descripcionImagen={"Inicio"} titulo={"Inicio"}/>
        <BotonNavegacion link={"/favoritos"} ancho={anchoBoton} imagen={favoritosIcon} descripcionImagen={"Salones favoritos"} titulo={"Favoritos"}/>

        </BarraNavegacion>
        </>
    )
}