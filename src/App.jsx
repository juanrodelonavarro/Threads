import { useState } from 'react'
import './App.css'
import { Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Visual2 from './components/Visual2'
import Buscar from './pages/Buscar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/buscar" element={<Buscar/>} />
        </Routes>
    </>
  )
}

export default App
