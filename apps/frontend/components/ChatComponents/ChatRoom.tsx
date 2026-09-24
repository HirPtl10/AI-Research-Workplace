import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import ChatRoomClient from "./ChatRoomClient";
import type { Message,Department } from "@repo/common-types";
type TempMessage = {
    id: number | string,
    content: string,
    role: "user" | "assistant"
}
export default function ChatRoom({ department }: {department: Department}) {
    let [messages, setMessages] = useState<TempMessage[]>([]);
    useEffect(() => {
        fetchMessages()
    }, [department])
    async function fetchMessages() {
        if(!department.conversation) return;
        try {
            console.log("I want to print this" + department.conversation.id)
            let res = await api.get(`/getMessages/${department.conversation.id}`)
            setMessages(res.data);
        } catch(err) {
            console.log(err);
        }
    }

    async function createMessage(content: string, role: "user" | "assistant", conversationId: number | null) {
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
              id: `user-${Date.now()}`,
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