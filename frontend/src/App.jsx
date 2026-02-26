import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./pages/Login"
import SalonHome from './pages/SalonHome'

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/salon' element={<SalonHome/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
