import React, { FC, useEffect, useState } from "react"


const ChatPage = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS');
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }   
        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])
    return <div>
        <Messages ws={wsChannel}/>
        <AddMessageChatForm ws={wsChannel}/>
    </div>
}

const Messages:FC<{ws:WebSocket | null}> = ({ws}) => {
    const [message, setMessage] = useState<ChatMessageType[]>([])
    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            setMessage(prevState => [...prevState, ...JSON.parse(e.data)])
        }

        ws?.addEventListener('message', messageHandler)
        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])
    return <div style={{height: '250px', overflowY: 'auto'}}>
        {message.map((message: ChatMessageType) => <Message message={message}/> )}
    </div>
}

const Message:FC<{message: ChatMessageType}> = ({message}) => {
    return <div>
            <div>{message.userName}</div>
            <img src={message.photo} alt="" style={{width: '50px'}}/>
            <div>{message.message}</div>
            <hr/>
    </div>
}


const AddMessageChatForm:FC<{ws:WebSocket | null}> = ({ws}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const sendMessage = () => {
        if (!message) {
            return
        }
        ws?.send(message)
        setMessage('')
    }
    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        ws?.addEventListener( 'open', openHandler)
        return () => {
            ws?.removeEventListener( 'open', openHandler)
        } 
    }, [ws])
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={readyStatus === 'pending'} onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string,
}

export default ChatPage