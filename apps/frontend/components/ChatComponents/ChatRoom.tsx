import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ChatRoomClient from "./ChatRoomClient";

export default function ChatRoom({ department }) {
    let [messages, setMessages] = useState({});
    useEffect(() => {
        fetchMessages()
    }, [])
    async function fetchMessages() {
        try {
            console.log("I want to print this" + department.id)
            let res = await api.get(`/getMessages/${department.conversation.id}`)
            setMessages(res.data)
        } catch(err) {
            console.log('error fetching')
            console.log(err.response.data.message);
        }
    }

    async function createMessage(content, role, conversationId) {
        try {
            let res = await api.post(`/createMessage/${conversationId}`, {
                content: content,
                role: role
            })
            console.log("this is what i wanted to print" + messages);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <ChatRoomClient messages={messages} department={department} onCreate={createMessage}/>
    )
}