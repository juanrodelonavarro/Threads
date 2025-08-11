import React from 'react'
import { supabase } from "../supabaseClient"

function Autorizacion() {

     const handleGoogleLogin = () => { supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin
        }
    })}

  return (
    <div>
        <button onClick={handleGoogleLogin} className='btn2'>Iniciar con Google</button>
    </div>
  )
}

export default Autorizacion