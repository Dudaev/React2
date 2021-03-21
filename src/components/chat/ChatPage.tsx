import React from "react"

const wb = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage = () => {
    console.log(wb)
    return <div>
        <Chat />
        <ChatForm/>
    </div>
}

const Chat = () => {
    return <div>
        <ChatMessage />
    </div>
}

const ChatMessage = () => {
    return <div>
        ChatMessage
    </div>
}


const ChatForm = () => {
    return <div>
        ChatForm
    </div>
}

export default ChatPage