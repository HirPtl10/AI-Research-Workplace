import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ChatRoomClient from "./ChatRoomClient";

export default function ChatRoom({ department }) {
    let [messages, setMessages] = useState([]);
    useEffect(() => {
        fetchMessages()
    }, [department])
    async function fetchMessages() {
        try {
            console.log("I want to print this" + department.conversation.id)
            let res = await api.get(`/getMessages/${department.conversation.id}`)
            setMessages(res.data);
        } catch(err) {
            console.log(err.response.data.message);
        }
    }

    async function createMessage(content, role, conversationId) {
        try {
            let res = await api.post(`/createMessage/${conversationId}`, {
                content: content,
                role: role
            })

            //@ts-ignore
            setMessages(prev => [
                ...prev,
                res.data
            ])
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="h-full min-h-0">
            <ChatRoomClient messages={messages} department={department} onCreate={createMessage}/>
        </div>
    )
}