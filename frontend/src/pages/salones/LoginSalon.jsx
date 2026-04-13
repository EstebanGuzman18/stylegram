import { LoginCard } from "../../components/LoginCard";

export default function LoginSalon() {
    return (
        <main className="h-screen w-screen flex justify-center items-center relative">
            <h1 className="font-peralta absolute top-18 text-xl sm:text-2xl xl:text-3xl">Ingresa a tu salón</h1>
            <LoginCard linkRegistro={"/registro-salon"} rutaFetch={"http://127.0.0.1:8000/api/salones/login/"} linkHome={'/salon-home'}/>
        </main>
    )
}