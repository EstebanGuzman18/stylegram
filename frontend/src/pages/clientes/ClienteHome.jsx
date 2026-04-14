import { useState, useEffect } from "react";
import ItemCard from "../../components/ItemCard";

export default function ClienteHome() {
    // obtener las citas confirmadas del cliente
    const [citasConfirmadas, setCitasConfirmadas] = useState([]);
    const buscarConfirmadas = async () => {
        const idCliente = JSON.parse(localStorage.getItem("user")).id;
        try {
            const citas = await fetch(`http://127.0.0.1:8000/api/citas/${idCliente}/clientes/?estado=confirmada`);
            const citasData = await citas.json();
            if (citas.ok) {
                setCitasConfirmadas(citasData);
            }
            else {
                alert(citasData.error);
            }

        }
        catch (error) {
            console.error("Error: ", error);
        }
    }
    useEffect(() => {
        buscarConfirmadas();
    }, []);

    // obtener las citas pendientes del cliente
    const [citasPendientes, setCitasPendientes] = useState([]);
    const buscarPendientes = async () => {
        const idCliente = JSON.parse(localStorage.getItem("user")).id;
        try {
            const citas = await fetch(`http://127.0.0.1:8000/api/citas/${idCliente}/clientes/?estado=pendiente`);
            const citasData = await citas.json();
            if (citas.ok) {
                setCitasPendientes(citasData);
            }
            else {
                alert(citasData.error);
            }
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }
    useEffect(() => {
        buscarPendientes();
    }, []);

    //obtener los datos del salon para mostrar su nombre, direccion e imagen en la tarjeta de la cita
    const [salon, setSalon] = useState({});
    const cambiarSalon = async (idSalon) => {
        try {
            const salon = await fetch(`http://127.0.0.1:8000/api/salones/${idSalon}`);
            const salonData = await salon.json();
            if (salon.ok) {
                setSalon(salonData);
            }
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }

    //eliminar cita pendiente
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

    //cambiar formato de fecha y hora de la cita
    const formatoFechaHora = (fechaHora) => {
        const fecha = new Date(fechaHora);
        return fecha.toLocaleString('es-CO', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
    };


    return (
        <>
        <section className="mb-5">
            <h3 className="font-platypi font-semibold pb-2">Citas confirmadas</h3>
            {/**Aquí iran las citas que han sido confirmadas por el salon*/}
            {citasConfirmadas.map(cita => (
                cambiarSalon(cita.salon),
                <ItemCard key={cita.id} imagenItem={salon.foto_url} nombre={salon.nombre_salon} descripcion={cita.servicio + " | " + salon.direccion}>{formatoFechaHora(cita.fecha_hora)}</ItemCard>
            ))}
        </section>

        <section>
            <h3 className="font-platypi font-semibold pb-2">Citas pendientes</h3>
            {/**Aquí iran las citas que fueron solicitadas pero no han recivido respuesta*/}
            {citasPendientes.map(cita => (
                <ItemCard key={cita.id_cita} imagenItem={salon.foto_url} nombre={salon.nombre_salon} descripcion={cita.servicio + " | " + salon.direccion}>
                    {formatoFechaHora(cita.fecha_hora)}
                    <button onClick={() => eliminarCita(cita.id_cita)} className="text-xl text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full ml-8 cursor-pointer">X</button>
                    </ItemCard>
            ))}

        </section>
        </>
    )
}