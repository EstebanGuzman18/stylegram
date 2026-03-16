import { BotonAgregar } from '../../components/BotonAgregar'
import pagosIcon from '../../assets/icons/pagos.png'

export default function ProgramarPagos() {
    return (
        <>
        <BotonAgregar imagen={pagosIcon} link={""}/>
        <section className="mt-6 px-2">
            <p className="text-center text-gray-600 italic">
                Aquí irán los recordatorios de pagos ya programados.
            </p>
        </section>
        </>
    )
}