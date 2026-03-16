import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ToggleTabs } from '../../components/ToggleTabs'
import { SeccionIngresos } from '../../components/SeccionIngresos'
import { SeccionGastos } from '../../components/SeccionGastos'

export default function Finanzas() {
    const [fecha, setFecha] = useState({mes:6, anio:2026})
    const meses = [
          "Enero","Febrero","Marzo","Abril","Mayo","Junio",
          "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
        ]

    const siguienteMes = () => {
        setFecha((prev) => {
            if (prev.mes === 12) {
                return {mes:1, anio:prev.anio+1}
            }
            return {mes:prev.mes+1, anio:prev.anio}
        })
    }

    const anteriorMes = () => {
        setFecha((prev) => {
            if (prev.mes === 1) {
                return {mes:12, anio:prev.anio-1}
            }
            return {mes:prev.mes-1, anio:prev.anio}
        })
    }

    return (
        <>
        {/**RESUMEN INGRESOS / GASTOS / BALANCE*/}
        <section className="mt-4 grid grid-cols-3 text-center font-semibold">
            <div className="text-green-600">
                Ingresos<br/>$ 0,00
            </div>
            <div className="text-red-600">
                Gastos<br/>$ 0,00
            </div>
            <div>
                Balance<br/>$ 0,00
            </div>
        </section>

        {/**SELECTOR DE MES*/}
        <section className="mt-4 flex justify-center items-center space-x-3">
            <button onClick={anteriorMes} className="text-xl font-bold cursor-pointer">&lt;</button>
    
            <h3 className="text-lg font-semibold">
                {meses[fecha.mes-1]} {fecha.anio}
            </h3>
    
            <button onClick={siguienteMes} className="text-xl font-bold cursor-pointer">&gt;</button>
        </section>

        <ToggleTabs nombreSeccion1={"Ingresos"} nombreSeccion2={"Gastos"} seccion1={<SeccionIngresos/>} seccion2={<SeccionGastos/>}/>

        <Link to={""} className="fixed bottom-23 right-6 md:bottom-10 z-50 w-14 h-14 md:w-16 md:h-16 bg-stylegram-primary text-white rounded-full flex items-center justify-center shadow-lg text-4xl cursor-pointer">
          +
        </Link>
        </>
    )
}