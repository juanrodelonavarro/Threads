import React, { useState, useEffect } from 'react'
import { supabase } from "../supabaseClient"
import Logothe from '../assets/logotheards.png'
import Avatar from '../assets/avatar.png'
import Add from '../assets/add.png'
import Puntos3 from '../assets/3puntos.png'
import Love from '../assets/iconolove.png'
import Comentario from '../assets/iconocomentario.png'
import Repost from '../assets/iconorepost.png'
import Enviar from '../assets/iconoenviar.png'
import Home from '../assets/barrahome.png'
import Buscar from '../assets/barrabuscar.png'
import Bcomentario from '../assets/barracomentario.png'
import Like from '../assets/barralike.png'
import Perfil from '../assets/barraperfil.png'
import Icimg from '../assets/iconoimg.png'
import Icph from '../assets/iconofoto.png'
import Icgif from '../assets/iconogif.png'
import Icmicro from '../assets/iconomicrofono.png'
import Borrar from '../assets/borrar.png'
import { Routes, Route, Link} from 'react-router-dom'

function Visual2() {
    const [mostrarComentarios, setMostrarComentarios] = useState(false)
    const [mostrarPerfil, setMostrarPerfil] = useState(false)
    const [comentario, setComentario] = useState("")
    const [usuario, setUsuario] = useState({
        nombre: "",
        avatar: Avatar
    })
    const [posts, setPosts] = useState([]) // Estado para las publicaciones

    const toggleComentarios = () => setMostrarComentarios(!mostrarComentarios);
    const togglePerfil = () => setMostrarPerfil(!mostrarPerfil);

    // Obtener datos del usuario logueado desde supabase.auth
    useEffect(() => {
        const obtenerUsuario = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                let avatarUrl = user.user_metadata?.avatar_url || Avatar

                if (avatarUrl && avatarUrl.includes("supabase.co/storage")) {
                    avatarUrl += `?t=${Date.now()}`
                }

                setUsuario({
                    nombre: user.user_metadata?.username || user.email,
                    avatar: avatarUrl
                })
            }
        }
        obtenerUsuario()
    }, [])

    // Obtener publicaciones desde la tabla "usuarios"
    useEffect(() => {
        const obtenerPosts = async () => {
            const { data, error } = await supabase
                .from("usuarios")
                .select("nombre, publicacion")
                .order("id", { ascending: false }) // Últimos primero

            if (error) {
                console.error("Error al traer publicaciones:", error)
            } else {
                setPosts(data)
            }
        }

        obtenerPosts()
    }, [])

    // Publicar comentario en la tabla "usuarios"
    const handlePublicar = async () => {
        if (!comentario.trim()) return

        const { error } = await supabase
            .from("usuarios")
            .insert([{
                nombre: usuario.nombre,
                publicacion: comentario
            }])

        if (error) {
            console.error("Error al publicar:", error)
        } else {
            setComentario("")
            setMostrarComentarios(false)

            // Refrescar lista
            const { data } = await supabase
                .from("usuarios")
                .select("nombre, publicacion")
                .order("id", { ascending: false })
            setPosts(data)
        }
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error al cerrar sesión:", error);
        } else {
            setMostrarPerfil(false);
        }
    };

    return (
        <div className='visual2'>
            <div className='logo'>
                <img src={Logothe} alt="logo" />
            </div>

            {/* Renderizado dinámico de posts */}

            <main className='listatwittes'>

                {posts.map((post, index) => (
                    <div className='twittes' key={index}>
                        <div className='seccp'>
                            <div className='avatar'>
                                <img
                                    src={usuario.avatar}
                                    alt="avatar"
                                    onError={(e) => e.target.src = Avatar}
                                />
                                <img src={Add} alt="add" />
                            </div>
                            <div className='nombreusuario'>
                                <p><b>{post.nombre}</b></p>
                            </div>
                            <div className='puntos'>
                                <img src={Puntos3} alt="puntos" />
                            </div>
                        </div>
                        <div className='contenidopost'>
                            <p>{post.publicacion}</p>
                        </div>
                        <div className='iconos'>
                            <img src={Love} alt="love" />
                            <img src={Comentario} alt="comentario" />
                            <img src={Repost} alt="repost" />
                            <img src={Enviar} alt="enviar" />
                        </div>
                    </div>
                ))}
            </main>
               
            <div className='barraestados'>
                <img src={Home} alt="home" />
                <Link to="/buscar"><img src={Buscar} alt="buscar" /></Link>
                <img
                    src={Bcomentario}
                    alt="comentario"
                    onClick={toggleComentarios}
                    style={{ cursor: 'pointer' }}
                />
                <img src={Like} alt="like" />
                <img
                    src={Perfil}
                    alt="perfil"
                    onClick={togglePerfil}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {/* Pestaña de Comentarios */}
            {mostrarComentarios && (
                <div className="pestana-comentarios">
                    <div className="drag-handle" onClick={toggleComentarios}></div>
                    <div className="contenido-pestana">
                        <div className="comentario-header">
                            <img
                                src={usuario.avatar}
                                alt="avatar"
                                className="comentario-avatar"
                                onError={(e) => e.target.src = Avatar}
                            />
                            <p className="comentario-usuario"><b>{usuario.nombre}</b></p>
                        </div>

                        <input
                            type="text"
                            placeholder="¿Qué novedades tienes?"
                            className="comentario-input"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        />

                        <div className="comentario-iconos">
                            <img src={Icimg} alt="img" />
                            <img src={Icph} alt="ph" />
                            <img src={Icgif} alt="gif" />
                            <img src={Icmicro} alt="micro" />
                        </div>

                        <button className="comentario-boton" onClick={handlePublicar}>
                            Publicar
                        </button>
                    </div>
                </div>
            )}

            {/* Pestaña de Perfil */}
            {mostrarPerfil && (
                <div className="pestana-perfil">
                    <button className="cerrar-perfil" onClick={togglePerfil}>
                        <img src={Borrar} alt={Borrar} />
                    </button>
                    <div className="perfil-contenido">
                        <img
                            src={usuario.avatar}
                            alt="avatar"
                            className="perfil-avatar"
                            onError={(e) => e.target.src = Avatar}
                        />
                        <div className="perfil-lista">
                            <h2>Perfil</h2>
                            <h2>Notificaciones</h2>
                            <h2>Privacidad</h2>
                            <h2>Ayuda</h2>
                            <h2>Archivar</h2>
                        </div>
                        <button className="cerrar-sesion" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Visual2
