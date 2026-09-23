import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ChatRoomClient from "./ChatRoomClient";
type Message = {
    role: "user" | "assistant",
    content: string
}
export default function ChatRoom({ department }) {
    // let [lastMessageId, setLastMessageId] = useState(0);
    let [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        fetchMessages()
    }, [department])
    async function fetchMessages() {
        try {
            console.log("I want to print this" + department.conversation.id)
            let res = await api.get(`/getMessages/${department.conversation.id}`)
            setMessages(res.data);
        } catch(err) {
            console.log(err);
        }
    }

    async function createMessage(content, role, conversationId) {
        //@ts-ignore
        setMessages(prev => [
            ...prev,
            {
                content: content,
                role: "user"
            }
        ])

        setMessages(prev => [
            ...prev,
            {
              role: "assistant",
              content: "",
            },
          ]);

        try {
            const response = await fetch(`http://localhost:3001/createMessage/${conversationId}`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: content,
                  role: role
                }),
              });

            const reader = response.body!.getReader();
            const decoder = new TextDecoder();

            let tempAns = "";

            while(true) {
                let { value, done } = await reader.read();
                if(done) break;
                const chunk = await decoder.decode(value);
                setMessages(prev => {
                    const updated = [...prev];
                    //@ts-ignore
                    updated[updated.length - 1] = {
                      ...updated[updated.length - 1],
                      //@ts-ignore
                      content: updated[updated.length - 1].content + chunk,
                    };
              
                    return updated;
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="h-full min-h-0 overflow-hidden">
            <ChatRoomClient messages={messages} department={department} onCreate={createMessage}/>
        </div>
    )
}