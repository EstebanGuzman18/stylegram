export default function Citas() {
    return (
        <>
        <section className="mb-5">
            <h3 className="font-platypi font-semibold pb-2">Solicitudes de citas</h3>
            {/**Aquí iran las citas que fueron solicitadas pero no han recivido respuesta*/}
            <i className="ml-30">No tienes solicitudes de citas</i>
        </section>

        <section>
            <h3 className="font-platypi font-semibold pb-2">Citas confirmadas</h3>
            {/**Aquí iran las citas que ya fueron confirmadas por el estilista*/}
            <i className="ml-30">No tienes citas confirmadas</i>
        </section>
        </>
    )
}