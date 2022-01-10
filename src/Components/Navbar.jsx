import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatProvider'

const Navbar = () => {

    const { usuario, ingresoUsuario, cerrarSesion } = useContext(ChatContext)


    return (
        <nav className="navbar navbar-dark bg-dark">
            <span className="navbar-brand ms-3">Chat</span>

            {
                usuario.estado ? (
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => cerrarSesion()}
                    >
                        Cerrar Sesion
                    </button>
                ) :
                    (
                        <button
                            className="btn btn-outline-success ms-2"
                            onClick={() => ingresoUsuario()}
                        >
                            Acceder
                        </button>
                    )
            }
        </nav>
    )
}

export default Navbar
