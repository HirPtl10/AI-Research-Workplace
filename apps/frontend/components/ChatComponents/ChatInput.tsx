import { useState, useRef } from "react"
import type { Department } from "@repo/common-types"
import type { Message } from "@repo/common-types"
import UploadButton from "./UploadButton"
type Props = {
    department: Department
    onCreate: (message: string, role: "user" | "assistant", conversationId: number | null) => void
}

export default function ChatInput({ onCreate, department }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    let [message, setMessage] = useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        setMessage(value);
    }

    async function handleSubmit(msg: string) {
        if (!department.conversation) return;
        await onCreate(msg, "user", department.conversation.id)
        setMessage("")
    }

    function handleUpload() {
        fileInputRef.current?.click();
    }

    function handleFileChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        console.log(file);
    }
    return (
        <div className="shrink-0 bg-[#111111] py-3">
            <div className="flex w-full items-center gap-2 rounded-2xl bg-[#1e1e1e] border border-white/10 p-1.5 focus-within:border-blue-500/60 focus-within:ring-1 focus-within:ring-blue-500/60 transition-all">
                <UploadButton/>
                <input
                    name="message"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            let msg = message;
                            if (!msg.trim()) return;
                            setMessage("")
                            handleSubmit(msg);
                        }
                    }}
                    placeholder="Write a message..."
                    className="
                        min-w-0 flex-1
                        bg-transparent
                        px-2 py-2
                        text-sm text-white
                        outline-none
                        placeholder:text-gray-500
                    "
                />
                <button
                    type="button"
                    onClick={() => {
                        if (!message.trim()) return;
                        handleSubmit(message);
                    }}
                    className="
                        shrink-0
                        rounded-xl
                        bg-blue-600
                        p-2.5
                        text-white
                        transition
                        hover:bg-blue-500
                        disabled:opacity-40
                        active:scale-95
                    "
                    disabled={!message.trim()}
                    title="Send message"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
