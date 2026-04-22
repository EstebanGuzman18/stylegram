import { useState, useRef } from 'react'
import imagenIcon from '../../assets/icons/imagen.png'

export default function FormularioProductos() {

    //  Manejo de la carga y vista previa de la foto principal
    const [fotoPrincipal, setImagen] = useState(imagenIcon)
    const inputimagen = useRef()
    const cambiarImagen = (e)=> {
        const nuevaImagen = e.target.files[0]
        if (!nuevaImagen) {
        return
        }
        const permitidos = ["image/jpeg","image/jpg","image/png","image/heic","image/heif"
        ]
    
        if (!permitidos.includes(nuevaImagen.type)) {
            alert("Formato no permitido. Selecciona una imagen válida.")
            e.target.value = ""
            return
        }
    
        if (nuevaImagen.size > 2 * 1024 * 1024) {
            alert("La imagen supera los 2MB")
            e.target.value = ""
            return
        }
     
        const imagen = URL.createObjectURL(nuevaImagen)
        setImagen(imagen)

    }

    // datos del producto a registrar
    const [datosProducto, setDatosProducto] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        cantidad: "",
        vendedor: JSON.parse(localStorage.getItem("user")).id
    })

    // manejar cambios en los campos del formulario
    const cambiarNombre = (e) => {
        setDatosProducto(prev => ({...prev, nombre: e.target.value}))
    }

    const cambiarPrecio = (e) => {
    const valor = e.target.valueAsNumber;

    setDatosProducto(prev => ({
            ...prev,
            precio: isNaN(valor) ? "" : valor
        }))
    }

    const cambiarDescripcion = (e) => {
        setDatosProducto(prev => ({...prev, descripcion: e.target.value}))
    }

    const cambiarCantidad = (e) => {
    const valor = e.target.valueAsNumber;

    setDatosProducto(prev => ({
            ...prev,
            cantidad: isNaN(valor) ? "" : valor
        }))
    }

    // Manejo del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/productos/crear/",
                {method: 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(datosProducto)})
            
            const data = await respuesta.json();

            if (respuesta.ok) {
                alert(data.mensaje);
            }
            else {
                alert(data.error);
            }
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <section className="relative mb-8">
            <form id="registro" onSubmit={handleSubmit} className="p-8 pt-37 pb-28">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <input type="file" onChange={cambiarImagen} ref={inputimagen} accept=".jpg,.jpeg,.png,.heic,.heif" className="hidden"/>
                    <img src={fotoPrincipal} onClick={() => inputimagen.current.click()} alt="foto principal" className="h-24 w-25 md:h-30 md:w-30 rounded-xl cursor-pointer"/>
                    <h3 className="font-serif text-lg">Foto del producto</h3>
                </div>

                <label htmlFor="nombre" className="self-start font-serif">Nombre del producto</label>
                <input type="text" id="nombre" value={datosProducto.nombre} onChange={cambiarNombre} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" maxLength="40" required/>
                
                
                <label htmlFor="precio" className="self-start font-serif">Precio</label>
                <input type="number" step="0.01" id="precio" value={datosProducto.precio} onChange={cambiarPrecio} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" max="99999999" required/>
            
                <label htmlFor="descripcion" className="self-start font-serif">Descripción</label>
                <textarea id="descripcion" value={datosProducto.descripcion} onChange={cambiarDescripcion} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1 resize-none" maxLength="255"></textarea>
                    
                <label htmlFor="cantidad" className="self-start font-serif">Cantidad</label>
                <input type="number" id="cantidad" step="1" value={datosProducto.cantidad} onChange={cambiarCantidad} className="border w-full rounded-lg mb-3 md:mb-5 lg:mb-6 focus:outline-none focus:ring-1 focus:ring-stylegram-primary px-2 py-1" max="999999" required/>    
            
                <button type="submit" className="bg-black text-white font-platypi rounded-lg w-30 md:w-32 lg:w-33 h-8 md:h-9 lg:h-10 hover:bg-gray-400 hover:text-black transition mb-2 absolute left-1/2 bottom-10 -translate-x-1/2">Registrar</button>
            </form>
        </section>
    )
}