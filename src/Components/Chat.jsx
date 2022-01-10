import React, { useEffect, useRef } from 'react'
import Agregar from './Agregar'

import { ChatContext } from '../Context/ChatProvider'
import { useContext } from 'react'

const Chat = () => {

    const { mensajes, usuario } = useContext(ChatContext)
    const refZonaChat = useRef(null)

    useEffect(() => {
        refZonaChat.current.scrollTop = refZonaChat.current.scrollHeight

    }, [mensajes])


    return (
        <div
            className='mt-3 px-2'
            style={{ height: '75vh', overflowY: 'scroll' }}
            ref={refZonaChat}
        >

            {
                mensajes.map((item, index) => (
                    usuario.uid === item.uid ? (
                        <div key={index} className='d-flex justify-content-end mb-2'>
                            <span className="badge bg-primary">
                                From: {usuario.email}
                                <hr />
                                {item.texto}
                            </span>
                        </div>
                    ) : (
                        <div key={index} className='d-flex justify-content-start mb-2'>
                            <span className="badge bg-secondary">
                                {item.texto}
                            </span>
                        </div>
                    )
                ))
            }




            <Agregar />
        </div>
    )
}

export default Chat
