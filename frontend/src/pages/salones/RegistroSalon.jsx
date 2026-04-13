import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { TagCamposRegistro } from "../../components/TagCamposRegistro"
import { HeaderRegistro } from "../../components/Header"
import { FotoPerfil } from "../../components/FotoPerfil"
import { AccionesRegistro } from "../../components/AccionesRegistro"


export default function RegistroSalon() {
    {/**enviar datos al backend */}
    const [nombreEstilista, setNombreEstilista] = useState("");
    const [nombreSalon, setNombreSalon] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [publico, setPublico] = useState("");
    const [opcionCompra, setOpcionCompra] = useState("");
    const [horario, setHorario] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [servicios, setServicios] = useState([]);
    
    const cambiarNombreEstilista = (e) => setNombreEstilista(e.target.value);
    const cambiarNombreSalon = (e) => setNombreSalon(e.target.value);
    const cambiarCorreo = (e) => setCorreo(e.target.value);
    const cambiarPassword = (e) => setPassword(e.target.value);
    const cambiarConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const cambiarWhatsapp = (e) => setWhatsapp(e.target.value);
    const cambiarCiudad = (e) => setCiudad(e.target.value);
    const cambiarDireccion = (e) => setDireccion(e.target.value);
    const cambiarPublico = (e) => setPublico(e.target.value);
    const cambiarOpcionCompra = (e) => setOpcionCompra(e.target.value);
    const cambiarHorario = (e) => setHorario(e.target.value);
    const cambiarDescripcion = (e) => setDescripcion(e.target.value);

    const navigate = useNavigate();
    const handleDatos = async(e) => {
        e.preventDefault()
        const datos = {nombre_estilista: nombreEstilista, nombre_salon: nombreSalon, correo: correo, password: password, confirm_password: confirmPassword, whatsapp: whatsapp, ciudad: ciudad, direccion: direccion, publico: publico, opcion_compra: opcionCompra, horario: horario, descripcion: descripcion, servicios: servicios}
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/salones/registro/",
                {method: 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(datos)})
            
            const data = await respuesta.json();

            if (respuesta.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/salon-home");
            }
            else {
                alert(data.error);
            }
        }
        catch (error) {
            console.error("Error: ", error);
        }
    };
    
  

    {/**campo dinamico: servicios */}
    const [servicioInput, setServicioInput] = useState("")
    
    const agregarServicio = () => {
        const servicio = servicioInput.trim().toLocaleLowerCase()
        if (!servicio) return
        if (servicios.includes(servicio)) {
            setServicioInput("")
            return
        }
        if (servicios.length >= 12) {
            alert("Solo se permiten hasta 12 servicios.")
            return
        }
        setServicios(prev => [...prev, servicio])
        setServicioInput("")
    }

    const eliminarServicio = (servicioEliminar) => {
        setServicios(prev => prev.filter(s => s !== servicioEliminar))
    }

    {/**campo dinamico: fotos */}
    const inputImagenRef = useRef(null)
    const clickInput = () => {
        inputImagenRef.current.click()
    }
    const [fotos, setFotos] = useState([])

    const agregarFoto = (e) => {
        const foto = e.target.files[0]
        if (!foto) return
        // Validar tipo
        const formatos_aceptados = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif']
        if (!formatos_aceptados.includes(foto.type)) {
                alert("Solo se admiten los formatos: jpg, jpeg, png, heic, heif")
                return
            }
        // Validar tamaño 2 MB
        if (foto.size > 2 * 1024 * 1024) {
            alert("Tamaño máximo: 2MB");
            return
        }
        //Evitar repetidas
        const repetida = fotos.some(f => f.name === foto.name)
        if (repetida) {
            alert("Ya elegiste esta imagen, prueba con otra")
            return
        }
        //limitar cantidad de imagenes
        if (fotos.length >= 7) {
            alert("Cantidad de imagenes permitidas: 7 (puedes subir más después)")
            return
        }

        setFotos(prev => [...prev, foto])
        e.target.value = ""
    }

    const eliminarFoto = (fotoEliminar) => {
        setFotos(prev => prev.filter(f => fotoEliminar !== f.name))
    }


    return (
    <>
    <HeaderRegistro titulo="Registrar salón virtual"></HeaderRegistro>
    <main className="relative">
        <img src="/logo_stylegram.svg" alt="Logo Stylegram" className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[15%] w-35 h-35"/>
        <form id="registro" onSubmit={handleDatos} className="p-8 pt-37 lg:pt-32 md:pt-45 pb-28 md:pb-30 lg:pb-35 md:flex gap-15 lg:gap-90">
            <FotoPerfil/>
            <div className="md:w-[50%]">
                <label htmlFor="nombre" className="self-start font-serif">Nombre</label>
                <input type="text" id="nombre" value={nombreEstilista} onChange={cambiarNombreEstilista} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>

                <label htmlFor="nombre_salon" className="self-start font-serif">Nombre de la barbería o salón</label>
                <input type="text" id="nombre_salon" value={nombreSalon} onChange={cambiarNombreSalon} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>

                <label htmlFor="descripcion" className="self-start font-serif">Descripción</label>
                <textarea id="descripcion" value={descripcion} onChange={cambiarDescripcion} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1 resize-none" maxLength="255"></textarea>

                <label htmlFor="publico_objetivo" className="self-start font-serif">Publico objetivo</label>
                <select name="publico_objetivo" id="publico_objetivo" value={publico} onChange={cambiarPublico} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
                    <option value="">Seleccione</option>
                    <option value="hombres">Hombres</option>
                    <option value="mujeres">Mujeres</option>
                    <option value="mixto">Mixto</option>
                </select>

                <label htmlFor="ciudad" className="self-start font-serif">Ciudad</label>
                <select name="ciudad" id="ciudad" value={ciudad} onChange={cambiarCiudad} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
                    <option value="">Seleccione</option>
                    <option value="bogota">Bogotá</option>
                    <option value="medellin">Medellín</option>
                    <option value="cali">Cali</option>
                    <option value="pasto">Pasto</option>
                    <option value="sandona">Sandoná</option>
                </select>

                <label htmlFor="direccion" className="self-start font-serif">Dirección</label>
                <input type="text" id="direccion" value={direccion} onChange={cambiarDireccion} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="45" required/>

                <label htmlFor="servicio" className="self-start font-serif">Servicios que presta</label>
                <div>
                    <input id="servicio" type="text" placeholder="Ej. Corte de cabello" value={servicioInput} onChange={(e) => setServicioInput(e.target.value)} className="border w-[73%] rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20"/>
                    <button type="button" onClick={agregarServicio} className="border w-[25%] rounded-lg px-2 py-1 font-platypi bg-stylegram-primary hover:bg-teal-300 cursor-pointer">Agregar</button>
                </div>
                <div className="flex flex-wrap">
                    {servicios.map(s => <TagCamposRegistro key={s} nombre={s} estiloDiv="bg-teal-100 border-2 border-stylegram-primary rounded-lg px-1 mr-2 mb-2" eliminar={eliminarServicio}/>)}
                </div>

            </div>
            <div className="md:w-[50%]">
                <label htmlFor="horario" className="self-start font-serif">Horario de atención</label>
                <input type="text" id="horario" value={horario} onChange={cambiarHorario} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="255"/>
                
                <label htmlFor="whatsapp" className="self-start font-serif">WhatsApp</label>
                <input type="tel" id="whatsapp" value={whatsapp} onChange={cambiarWhatsapp} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                
                <label htmlFor="opcion_compra" className="self-start font-serif">Opción de compra para sus productos</label>
                <select name="opcion_compra" id="opcion_compra" value={opcionCompra} onChange={cambiarOpcionCompra} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
                    <option value="">Seleccione</option>
                    <option value="online">Online (Envío disponible)</option>
                    <option value="fisico">Físico (Venta presencial)</option>
                </select>
                
                <label htmlFor="input_imagen" className="self-start font-serif">Fotos de su barberia o salón de belleza</label>
                <input id="input_imagen" type="file" accept=".jpg,.jpeg,.png,.heic,.heif" ref={inputImagenRef} onChange={agregarFoto} className="hidden"/>
                <button type="button" onClick={clickInput} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 px-2 py-1 font-platypi bg-stylegram-primary hover:bg-teal-300 cursor-pointer">Agregar</button>
                <div className="flex flex-wrap">
                    {fotos.map((foto) => <TagCamposRegistro key={foto.name} nombre={foto.name} estiloDiv={"bg-teal-100 border-2 border-stylegram-primary rounded-lg px-2 py-1 mr-2 mb-2 inline-flex items-center gap-2"} eliminar={eliminarFoto}/>)}
                </div>
                

                <label htmlFor="correo" className="self-start font-serif">Correo electronico</label>
                <input type="email" id="correo" value={correo} onChange={cambiarCorreo} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>

                <label htmlFor="contraseña" className="self-start font-serif">Contraseña</label>
                <input type="password" id="contraseña" value={password} onChange={cambiarPassword} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                <label htmlFor="confirmar" className="self-start font-serif">Confirmar contraseña</label>
                <input type="password" id="confirmar" value={confirmPassword} onChange={cambiarConfirmPassword} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
            </div>
            <AccionesRegistro espacioLg={"lg:bottom-6"} linkLogin={"/login-salon"}/>
        </form>
    </main>
    </>    
)
}