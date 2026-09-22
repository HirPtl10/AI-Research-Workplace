"use client"
import { api } from "../../lib/api";
import ChatInput from "./ChatInput"

export default function ChatRoomClient({messages, department, onCreate}) {
    console.log(messages)
    return (
        <div>
            <ChatInput onCreate={onCreate} department={department}/>

        </div>
    )
}