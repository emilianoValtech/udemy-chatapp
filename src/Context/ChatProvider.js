import React, { createContext, useEffect, useState } from 'react'
import { auth, db, provider } from '../firebase'

export const ChatContext = createContext()

const ChatProvider = (props) => {

    const dataUsuario = {uid: null, email: null, estado: null}

    const [usuario, setUsuario] = useState(dataUsuario)
    const [mensajes, setMensajes] = useState([])

    useEffect(()=>{
        detectarUsuario()
        cargarMensajes()
    }, [])

    const detectarUsuario = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUsuario({uid: user.uid, email: user.email, estado: true})
            }else {
                setUsuario({
                    uid: null, email: null, estado: false
                })
            }
        })
    }

    const ingresoUsuario = async () => {
        try {
            await auth.signInWithPopup(provider)
        } catch (error) {
            console.log(error)
        }
    }

    const cerrarSesion = () => {
        auth.signOut()
    }

    const cargarMensajes = () => {
        db.collection('chat')
            .orderBy('fecha')
            .onSnapshot(query => {
                const arrayMensajes = query.docs.map(item => item.data())
                setMensajes(arrayMensajes)
            })
    }

    const agregarMensajes = async (uid, mensaje) => {
        try {
            await db.collection('chat').add({
                fecha: Date.now(),
                texto: mensaje,
                uid: uid
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ChatContext.Provider value={{usuario,ingresoUsuario, cerrarSesion,mensajes, agregarMensajes}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatProvider
