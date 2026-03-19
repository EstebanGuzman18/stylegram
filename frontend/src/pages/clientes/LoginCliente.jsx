import { LoginCard } from "../../components/LoginCard"

export default function LoginCliente() {
    return (
        <main className="h-screen w-screen flex justify-center items-center relative">
            <h1 className="font-peralta absolute top-18 text-xl sm:text-2xl xl:text-3xl">Inicia sesión como cliente</h1>
            <LoginCard linkRegistro={"/registro-cliente"} linkOlvideContraseña={""} rutaFetch={"http://127.0.0.1:8000/api/clientes/login/"}/>
        </main>
    )
}