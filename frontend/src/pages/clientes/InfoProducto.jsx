import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaImage } from "react-icons/fa";

export default function InfoProducto() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Obtener la información del producto
    const [producto, setProducto] = useState(null);
    const buscarProducto = async () => {
        try {
            const respuesta = await fetch(`http://127.0.0.1:8000/api/productos/${id}/`);
            const productoData = await respuesta.json();
            if (respuesta.ok) {
                setProducto(productoData);
            }
        } catch (error) {
            console.error("Error al buscar el producto:", error);
        }
    };

    useEffect(() => {
        buscarProducto();
    }, []);

    // Redireccionar al whatsapp del vendedor
    const handleWhatsApp = () => {
        const mensaje = `Hola, estoy interesado en el producto: ${producto?.nombre}`;
        const url = `https://wa.me/${producto.vendedor.whatsapp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    };

  
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            {/* Imagen */}
            {producto?.foto_url ? (
                <img
                  src={producto?.foto_url}
                  alt={"Imagen del producto"}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                ) : (
                  <FaImage className="text-gray-400 mb-4 w-full h-64 object-cover rounded-xl" />
                )
            }
    
            {/* Nombre */}
            <h2 className="text-2xl font-bold mb-2">{producto?.nombre}</h2>
    
            {/* Precio */}
            <p className="text-xl text-green-600 font-semibold mb-2">
              ${producto?.precio}
            </p>
    
            {/* Descripción */}
            <p className="text-gray-600 mb-3">{producto?.descripcion}</p>
    
            {/* Cantidad */}
            <p className="text-sm text-gray-500 mb-4">
              Stock disponible: {producto?.cantidad}
            </p>
    
            {/* Tipo de compra */}
            <div className="mb-6">
              {producto?.vendedor.opcion_compra === "online" ? (
                <p className="text-gray-700">
                  Puedes comprar este producto en el local físico ubicado en la dirección: 
                  <span className="font-semibold">{producto?.vendedor.direccion}, {producto?.vendedor.ciudad}</span> o también
                  puedes comprarlo en línea contactando al vendedor por WhatsApp.
                </p>
              ) : (
                <p className="text-gray-700">
                  Este producto solo está disponible para compra física en la dirección:
                  <span className="font-semibold">{producto?.vendedor.direccion}, {producto?.vendedor.ciudad}</span>.
                </p>
              )}
          </div>
  
          {/* Botones */}
          <div className="flex gap-3">
  
            {/* Botón atrás */}
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-xl cursor-pointer"
            >
              Atrás
            </button>
  
            {/* Botón WhatsApp (solo si venta_online) */}
            {producto?.vendedor.opcion_compra === "online" && (
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl cursor-pointer"
              >
                Comprar <FaWhatsapp size={25} className="inline-block ml-1" />
              </button>
            )}
  
          </div>
        </div>
      </div>
    );
}