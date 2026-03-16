import { AccionesRegistro } from "../../components/AccionesRegistro";
import { HeaderRegistro } from "../../components/Header";
import { FotoPerfil } from "../../components/FotoPerfil";

export default function RegistroCliente() {
    return (
        <>
        <HeaderRegistro titulo={"Registrar cliente"}/>
        <main className="relative">
            <img src="/logo_stylegram.svg" alt="Logo Stylegram" className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[15%] w-35 h-35"/>
            <form id="registro" className="p-8 pt-37 lg:pt-32 md:pt-45 pb-28 md:flex md:gap-15 lg:gap-90">
                <FotoPerfil/>
                <div className="md:w-[50%]">
                    <label htmlFor="nombre" className="self-start font-serif">Nombre</label>
                    <input type="text" id="nombre" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>
                    
                    <label htmlFor="ciudad" className="self-start font-serif">Ciudad</label>
                    <select name="ciudad" id="ciudad" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
                        <option value="">Seleccione</option>
                        <option value="bogota">Bogotá</option>
                        <option value="medellin">Medellín</option>
                        <option value="cali">Cali</option>
                        <option value="pasto">Pasto</option>
                        <option value="sandona">Sandoná</option>
                    </select>
                    
                    <label htmlFor="whatsapp" className="self-start font-serif">WhatsApp</label>
                    <input type="tel" id="whatsapp" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                </div>
                <div className="md:w-[50%]">
                    <label htmlFor="correo" className="self-start font-serif">Correo electronico</label>
                    <input type="email" id="correo" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>
                    
                    <label htmlFor="contraseña" className="self-start font-serif">Contraseña</label>
                    <input type="password" id="contraseña" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                    
                    <label htmlFor="confirmar" className="self-start font-serif">Confirmar contraseña</label>
                    <input type="password" id="confirmar" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                </div>
                <AccionesRegistro espacioLG={"lg:bottom-0"} linkLogin={"/login-cliente"}/>
            </form>
        </main>
        </>
    )
}