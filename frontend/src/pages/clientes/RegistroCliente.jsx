import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccionesRegistro } from "../../components/AccionesRegistro";
import { HeaderRegistro } from "../../components/Header";
import { FotoPerfil } from "../../components/FotoPerfil";

export default function RegistroCliente() {
    const [nombre, setNombre] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const cambiarNombre = (e) => setNombre(e.target.value);
    const cambiarCiudad = (e) => setCiudad(e.target.value);
    const cambiarWhatsapp = (e) => setWhatsapp(e.target.value);
    const cambiarCorreo = (e) => setCorreo(e.target.value);
    const cambiarPassword = (e) => setPassword(e.target.value);
    const cambiarConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const navigate = useNavigate();
    const handleDatos = async (e) => {
        e.preventDefault();
        const datos = {nombre:nombre, ciudad:ciudad, whatsapp:whatsapp, correo_electronico:correo, password:password, confirm_password:confirmPassword}
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/clientes/registro/",
                {method: 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(datos)})
            
            const data = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/cliente-home");
            }
            else {
                alert(data.error);
            }
        }
        catch (error) {
            console.error("Error: ", error);
        }
    };


    return (
        <>
        <HeaderRegistro titulo={"Registrar cliente"}/>
        <main className="relative">
            <img src="/logo_stylegram.svg" alt="Logo Stylegram" className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[15%] w-35 h-35"/>
            <form onSubmit={handleDatos} className="p-8 pt-37 lg:pt-32 md:pt-45 pb-28 md:flex md:gap-15 lg:gap-90">
                <FotoPerfil/>
                <div className="md:w-[50%]">
                    <label htmlFor="nombre" className="self-start font-serif">Nombre</label>
                    <input type="text" value={nombre} onChange={cambiarNombre} id="nombre" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>
                    
                    <label htmlFor="ciudad" className="self-start font-serif">Ciudad</label>
                    <select value={ciudad} onChange={cambiarCiudad} id="ciudad" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
                        <option value="">Seleccione</option>
                        <option value="bogota">Bogotá</option>
                        <option value="medellin">Medellín</option>
                        <option value="cali">Cali</option>
                        <option value="pasto">Pasto</option>
                        <option value="sandona">Sandoná</option>
                    </select>
                    
                    <label htmlFor="whatsapp" className="self-start font-serif">WhatsApp</label>
                    <input type="tel" id="whatsapp" value={whatsapp} onChange={cambiarWhatsapp} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                </div>
                <div className="md:w-[50%]">
                    <label htmlFor="correo" className="self-start font-serif">Correo electronico</label>
                    <input type="email" id="correo" value={correo} onChange={cambiarCorreo} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>
                    
                    <label htmlFor="contraseña" className="self-start font-serif">Contraseña</label>
                    <input type="password" id="contraseña" value={password} onChange={cambiarPassword} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                    
                    <label htmlFor="confirmar" className="self-start font-serif">Confirmar contraseña</label>
                    <input type="password" id="confirmar" value={confirmPassword} onChange={cambiarConfirmPassword} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                </div>
                <AccionesRegistro espacioLG={"lg:bottom-0"} linkLogin={"/login-cliente"}/>
            </form>
        </main>
        </>
    )
}