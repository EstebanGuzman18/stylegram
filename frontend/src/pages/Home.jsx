import { OpcionesIngreso } from "../components/OpcionesIngreso";
{/*Esta es la pagina inicial de stylegram donde los usuarios podran elegir iniciar sesión o registrarse 
    ya sea como cliente o estilista*/}

export default function Home() {
    return (
        <main className="h-screen flex flex-col md:flex-row relative">
        <OpcionesIngreso titulo="Soy Barbero o Estilista" colorFondo="bg-stylegram-primary" colorBoton="bg-stylegram-secondary" linkRegistro="/registro-salon" linkLogin={"/login-salon"}/>
        <OpcionesIngreso titulo="Soy Cliente" colorFondo="bg-stylegram-secondary" colorBoton="bg-stylegram-primary" linkRegistro="/registro-cliente" linkLogin={"login-cliente"}/>
        <img src="/logo_stylegram.svg" alt="Logo Stylegram" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-35 h-35 lg:h-42 lg:w-42 xl:h-50 xl:w-50"></img>
        </main>
    )
}