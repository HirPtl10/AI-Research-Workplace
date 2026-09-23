import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ChatRoomClient from "./ChatRoomClient";

export default function ChatRoom({ department }) {
    let [lastMessageId, setLastMessageId] = useState(0);
    let [messages, setMessages] = useState([]);
    useEffect(() => {
        fetchMessages()
    }, [department])
    async function fetchMessages() {
        try {
            console.log("I want to print this" + department.conversation.id)
            let res = await api.get(`/getMessages/${department.conversation.id}`)
            setMessages(res.data);
            setLastMessageId(messages[messages.length - 1].id)
        } catch(err) {
            console.log(err);
        }
    }

    async function createMessage(content, role, conversationId) {
        //@ts-ignore
        setMessages(prev => [
            ...prev,
            {
                id: lastMessageId + 1,
                content: content,
                role: "user"
            }
        ])
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