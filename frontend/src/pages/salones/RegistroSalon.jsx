import { useState, useRef } from "react"
import { TagCamposRegistro } from "../../components/TagCamposRegistro"
import { HeaderRegistro } from "../../components/Header"
import { FotoPerfil } from "../../components/FotoPerfil"
import { AccionesRegistro } from "../../components/AccionesRegistro"


export default function RegistroSalon() {
    {/**campo dinamico: servicios */}
    const [servicioInput, setServicioInput] = useState("")
    const [servicios, setServicios] = useState([])
    
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
        <form id="registro" onSubmit={(e)=>{e.preventDefault()}} className="p-8 pt-37 lg:pt-32 md:pt-45 pb-28 md:pb-30 lg:pb-35 md:flex gap-15 lg:gap-90">
            <FotoPerfil/>
            <div className="md:w-[50%]">
                <label htmlFor="nombre" className="self-start font-serif">Nombre</label>
                <input type="text" id="nombre" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>

                <label htmlFor="nombre_salon" className="self-start font-serif">Nombre de la barbería o salón</label>
                <input type="text" id="nombre_salon" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>

                <label htmlFor="descripcion" className="self-start font-serif">Descripción</label>
                <textarea id="descripcion" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1 resize-none" maxLength="255"></textarea>

                <label htmlFor="publico_objetivo" className="self-start font-serif">Publico objetivo</label>
                <select name="publico_objetivo" id="publico_objetivo" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
                    <option value="">Seleccione</option>
                    <option value="hombres">Hombres</option>
                    <option value="mujeres">Mujeres</option>
                    <option value="mixto">Mixto</option>
                </select>

                <label htmlFor="ciudad" className="self-start font-serif">Ciudad</label>
                <select name="ciudad" id="ciudad" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
                    <option value="">Seleccione</option>
                    <option value="bogota">Bogotá</option>
                    <option value="medellin">Medellín</option>
                    <option value="cali">Cali</option>
                    <option value="pasto">Pasto</option>
                    <option value="sandona">Sandoná</option>
                </select>

                <label htmlFor="direccion" className="self-start font-serif">Dirección</label>
                <input type="text" id="direccion" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="45" required/>

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
                <input type="text" id="horario" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="255"/>
                
                <label htmlFor="whatsapp" className="self-start font-serif">WhatsApp</label>
                <input type="tel" id="whatsapp" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                
                <label htmlFor="opcion_compra" className="self-start font-serif">Opción de compra para sus productos</label>
                <select name="opcion_compra" id="opcion_compra" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" required>
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
                <input type="email" id="correo" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>

                <label htmlFor="contraseña" className="self-start font-serif">Contraseña</label>
                <input type="password" id="contraseña" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
                <label htmlFor="confirmar" className="self-start font-serif">Confirmar contraseña</label>
                <input type="password" id="confirmar" className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="20" required/>
            </div>
            <AccionesRegistro espacioLg={"lg:bottom-6"} linkLogin={"/login-salon"}/>
        </form>
    </main>
    </>    
)
}