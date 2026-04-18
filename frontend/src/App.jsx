import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import LoginCliente from './pages/clientes/LoginCliente'
import LoginSalon from './pages/salones/LoginSalon'
import RegistroCliente from './pages/clientes/RegistroCliente'
import RegistroSalon from './pages/salones/RegistroSalon'
import LayoutSalon from './layouts/LayoutSalon'
import SalonHome from './pages/salones/SalonHome'
import Citas from './pages/salones/Citas'
import Productos from './pages/salones/Productos'
import Finanzas from './pages/salones/Finanzas'
import ProgramarPagos from './pages/salones/ProgramarPagos'
import FormularioProductos from './pages/salones/FormularioProductos'
import LayoutCliente from './layouts/LayoutCliente'
import ClienteHome from './pages/clientes/ClienteHome'
import Buscar from './pages/clientes/Buscar'
import SalonesFavoritos from './pages/clientes/SalonesFavoritos'
import InfoSalon from './pages/clientes/InfoSalon'
import InfoProducto from './pages/clientes/InfoProducto'
import SolicitarCita from './pages/clientes/SolicitarCita'


const router = createBrowserRouter([
  {path:'/', element:<Home/>},
  {path:'/login-cliente', element:<LoginCliente/>},
  {path:'/login-salon', element:<LoginSalon/>},
  {path:'/registro-salon', element:<RegistroSalon/>},
  {path:'/registro-cliente', element:<RegistroCliente/>},
  {element:<LayoutSalon/>, children:[
    {path:'/salon-home', element:<SalonHome/>, handle:{titulo:"Mi salón"}},
    {path:'/citas', element:<Citas/>, handle:{titulo:"Citas"}},
    {path:'/productos', element:<Productos/>, handle:{titulo:"Mis productos"}},
    {path:'/finanzas', element:<Finanzas/>, handle:{titulo:"Finanzas"}},
    {path:'/programar-pagos', element:<ProgramarPagos/>, handle:{titulo:"Recordar pagos"}},
    {path:'/registrar-producto', element:<FormularioProductos/>, handle:{titulo:"Registrar producto"}}
  ]},
  {element:<LayoutCliente/>, children:[
    {path:'/cliente-home', element:<ClienteHome/>, handle:{titulo:"Mis citas"}},
    {path:'/buscar', element:<Buscar/>, handle:{titulo:"Buscar"}},
    {path:'/favoritos', element:<SalonesFavoritos/>, handle:{titulo:"Salones favoritos"}},
    {path:'/info-salon/:id', element:<InfoSalon/>, handle:{titulo:"Información del salón"}},
    {path:'/info-producto/:id', element:<InfoProducto/>, handle:{titulo:"Información del producto"}},
    {path:'/solicitar-cita/:idSalon', element:<SolicitarCita/>, handle:{titulo:"Solicitar cita"}}
  ]}
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
