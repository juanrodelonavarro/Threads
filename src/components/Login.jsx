import React from 'react'
import '../App.css'
import Logo from '../assets/logo.png'
import Logom from '../assets/logometa.png'
import Autorizacion from './Autorizacion'
import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'
import Visual2 from './Visual2'


function Login() {
    const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (!user) {
    
  return (
    <div className='login'>
        <div className='idioma'>
            <p>Spanish (LT)</p>
        </div>

        <div className='logo'>
            <img src={Logo} alt={Logo} />
        </div>

        
            <div className='columnas'>
                <input type="text" name='email' placeholder='Escriba el correo' />
                <input type="password" name='password' placeholder='Escriba el Passaword' />
                <button className='btn1'>Login in</button>
                <Autorizacion/>
            </div>
       

        <div className='logometa'>
            <img src={Logom} alt={Logom} />
        </div>
    </div>
  )
}

return(
  <>
      <Visual2/>
  </>
)
}
export default Login