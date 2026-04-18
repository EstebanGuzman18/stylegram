import { useState } from "react";
import { useParams } from "react-router-dom";

//Formulario para solicitar cita, se accede desde el boton "Solicitar cita" en la pagina de informacion del salon, se le pasa el id del salon para que sepa a que salon se le esta solicitando la cita

export default function SolicitarCita() {
    const { idSalon } = useParams();
    const idCliente = JSON.parse(localStorage.getItem("user")).id;
    const [servicio, setServicio] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    const cambiarServicio = (e) => setServicio(e.target.value);
    const cambiarFecha = (e) => setFecha(e.target.value);
    const cambiarHora = (e) => setHora(e.target.value);

    const handleDatos = async (e) => {
        e.preventDefault();
        const fecha_hora = new Date(`${fecha}T${hora}`).toISOString();
        const datos = {servicio:servicio, fecha_hora: fecha_hora, cliente:idCliente, salon:idSalon}
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/citas/solicitar/",
                {method: 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify(datos)})
            
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
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <form onSubmit={handleDatos} className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg">
                    
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Agendar Cita
                    </h2>
        
                    {/* Servicio */}
                    <div className="mb-6">
                        <label htmlFor="servicio" className="block mb-2 text-lg font-medium">
                            Servicio
                        </label>
                        <input
                            type="text"
                            id="servicio"
                            value={servicio}
                            onChange={cambiarServicio}
                            className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-stylegram-primary"
                            placeholder="Ej: Corte, Barba..."
                        />
                    </div>
        
                    {/* Fecha y Hora en fila */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Fecha */}
                        <div>
                            <label htmlFor="fecha" className="block mb-2 text-lg font-medium">
                                Fecha
                            </label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={cambiarFecha}
                                className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-stylegram-primary"
                            />
                        </div>
        
                        {/* Hora */}
                        <div>
                            <label htmlFor="hora" className="block mb-2 text-lg font-medium">
                                Hora
                            </label>
                            <input
                                type="time"
                                id="hora"
                                value={hora}
                                onChange={cambiarHora}
                                className="w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-stylegram-primary"
                            />
                        </div>
        
                    </div>
        
                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full bg-stylegram-primary text-white py-3 text-lg rounded-xl hover:opacity-90 transition shadow-md"
                    >
                        Crear cita
                    </button>
        
                </form>
            </div>
        </>
    )
}