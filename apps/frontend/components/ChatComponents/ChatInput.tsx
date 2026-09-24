import { useState } from "react"
import type { Department } from "@repo/common-types"
import type { Message } from "@repo/common-types"
type Props = {
    department: Department
    onCreate: (message: string, role: "user" | "assistant", conversationId: number | null) => void
}

export default function ChatInput({ onCreate, department }: Props) {
    let [message, setMessage] = useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        setMessage(value);
    }

    async function handleSubmit(msg: string) {
        if(!department.conversation) return;
        await onCreate(msg, "user", department.conversation.id)
        setMessage("")
    }
    return (
        <div className="shrink-0 border-t border-white/5 bg-[#111111] py-3">
            <div className="flex w-full items-end gap-2">
                <input
                    name="message"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            let msg = message;
                            setMessage("")
                            handleSubmit(msg);
                        }
                    }}
                    placeholder="Write a message..."
                    className="
                        min-w-0 flex-1
                        rounded-xl
                        border border-transparent
                        bg-[#2a2a2a]
                        px-4 py-3
                        text-sm text-white
                        outline-none
                        placeholder:text-gray-500
                        focus:border-gray-600
                    "
                />
                <button
                    onClick={() => handleSubmit(message)}
                    className="
                        shrink-0
                        rounded-xl
                        bg-white
                        px-4 py-3
                        text-sm font-medium text-black
                        transition
                        hover:bg-gray-200
                        active:scale-95
                    "
                >
                    Send
                </button>
            </div>
        </div>
    )
}
