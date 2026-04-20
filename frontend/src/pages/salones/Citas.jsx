import { useState, useEffect } from "react";
import { ItemCard } from "../../components/ItemCard";
import { FiCheck, FiX } from "react-icons/fi";

export default function Citas() {
    // obtener las solicitudes de citas que han heco los clientes al salón
    const [solicitudes, setSolicitudes] = useState([]);
    const buscarSolicitudes = async () => {
        const idSalon = JSON.parse(localStorage.getItem("user")).id;
        try {
            const citas = await fetch(`http://127.0.0.1:8000/api/citas/${idSalon}/salones/?estado=pendiente`);
            const data = await citas.json();
            if (citas.ok) {
                setSolicitudes(data);
            }
            else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error al buscar solicitudes:", error);
        }
    };

    useEffect(() => {
        buscarSolicitudes();
    }, []);

    // obtener las citas confirmadas del salon
    const [citasConfirmadas, setCitasConfirmadas] = useState([]);
    const buscarConfirmadas = async () => {
        const idSalon = JSON.parse(localStorage.getItem("user")).id;
        try {
            const citas = await fetch(`http://127.0.0.1:8000/api/citas/${idSalon}/salones/?estado=confirmada`);
            const data = await citas.json();
            if (citas.ok) {
                setCitasConfirmadas(data);
            }
            else {
                alert(data.error);
            }

        }
        catch (error) {
            console.error("Error: ", error);
        }
    }
    useEffect(() => {
        buscarConfirmadas();
    }, []);

    //cambiar formato de fecha y hora de la cita
    const formatoFechaHora = (fechaHora) => {
        const fecha = new Date(fechaHora);
        return fecha.toLocaleString('es-CO', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
    };

    //rechazar cita
    const eliminarCita = async (id) => {
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/api/citas/${id}/eliminar/`, {
                method: "DELETE"
            });
    
            if (respuesta.ok) {
                // quitar la cita del estado
                setCitasPendientes(prev =>
                    prev.filter(cita => cita.id_cita !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    //confirmar cita pendiente
    const confirmarCita = async (id) => {
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/api/citas/${id}/confirmar/`, {
                method: "PATCH"
            });
    
            if (respuesta.ok) {
                const cita = solicitudes.find(c => c.id_cita === id);
                setSolicitudes(prev =>
                    prev.filter(c => c.id_cita !== id)
                );
    
                setCitasConfirmadas(prev => [
                    ...prev,
                    { ...cita, estado: "confirmada" }
                ]);
            }
    
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <section className="mb-5">
            <h3 className="font-platypi font-semibold pb-2">Solicitudes de citas</h3>
            {/**Aquí iran las citas que fueron solicitadas pero no han recivido respuesta*/}
            {solicitudes.map(cita => (
                <ItemCard key={cita.id_cita} imagenItem={cita.cliente.foto_url} nombre={cita.cliente.nombre} descripcion={cita.servicio + " | " + cita.cliente.ciudad}>
                    <div>
                    {formatoFechaHora(cita.fecha_hora)}
                    <div className="flex justify-center mt-2 gap-4">
                        <FiX onClick={() => eliminarCita(cita.id_cita)} className="cursor-pointer bg-red-500 text-white hover:bg-red-700 hover:scale-110 transition transform rounded-sm" size={30} title="Rechazar"/>
                        <FiCheck onClick={() => confirmarCita(cita.id_cita)} className="cursor-pointer bg-green-500 text-white hover:bg-green-700 hover:scale-110 transition transform rounded-sm" size={30} title="Aceptar"/>
                    </div>
                    </div>
                </ItemCard>
            ))}
        </section>

        <section>
            <h3 className="font-platypi font-semibold pb-2">Citas confirmadas</h3>
            {/**Aquí iran las citas que ya fueron confirmadas por el estilista*/}
            {citasConfirmadas.map(cita => (
                <ItemCard key={cita.id_cita} imagenItem={cita.cliente.foto_url} nombre={cita.cliente.nombre} descripcion={cita.servicio + " | " + cita.cliente.ciudad}>
                    {formatoFechaHora(cita.fecha_hora)}
                </ItemCard>
            ))}
        </section>
        </>
    )
}