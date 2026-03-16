/**Componente reutilizable para mostrar ítems agregados por el usuario
 * en forma de etiquetas (servicios o fotos). Cada etiqueta incluye el nombre del ítem
 * y un botón de eliminación para gestionarlo dinámicamente.
 */

export function TagCamposRegistro({nombre, estiloDiv, eliminar}) {
    return (
        <div className={estiloDiv}>
            {nombre}
            <button onClick={() => eliminar(nombre)} className="ml-2 font-bold hover:text-red-500 cursor-pointer">X</button>
        </div>
    )
}