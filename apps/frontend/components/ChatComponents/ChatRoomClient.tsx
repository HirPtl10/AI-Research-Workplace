"use client"
import { useEffect, useRef } from "react"
import ChatInput from "./ChatInput"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Department } from "@repo/common-types";

type Message = {
    id: number | string,
    content: string,
    role: "user" | "assistant"
}

type Props = {
    messages:  Message[],
    department: Department,
    onCreate: (content: string, role: "user" | "assistant", conversationId: number | null) => Promise<void>
}

export default function ChatRoomClient({messages, department, onCreate}: Props) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-[#111111]">
            <header className="flex shrink-0 items-center gap-3 border-b border-white/5 bg-[#171717]/50 backdrop-blur px-4 sm:px-6 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/20 text-xs font-semibold text-blue-400">
                    {department.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-white">{department.name}</h2>
                    <p className="text-xs text-gray-400">Department workplace channel</p>
                </div>
            </header>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col px-3 sm:px-6">
                <div className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col">
                    <div ref={scrollRef} className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto py-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex h-full items-center justify-center text-center p-6">
                                <div className="max-w-sm space-y-2">
                                    <p className="text-sm font-medium text-gray-400">No messages yet</p>
                                    <p className="text-xs text-gray-600">Type a message below to start the department discussion.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full min-w-0 flex-col gap-4">
                                {messages.map((message) => {
                                    const isUser = message.role === "user";
                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex min-w-0 ${isUser ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`
                                                    min-w-0 max-w-[88%] sm:max-w-[80%] overflow-x-auto break-words
                                                    rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                                                    ${isUser
                                                        ? "rounded-tr-none bg-blue-600 text-white"
                                                        : "rounded-tl-none bg-[#222222] border border-white/10 text-gray-100"
                                                    }
                                                    [&>*:first-child]:mt-0
                                                    [&>*:last-child]:mb-0
                                                    [&_p]:my-1.5
                                                    [&_ul]:my-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-4
                                                    [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-4
                                                    [&_li]:my-0.5
                                                    [&_h1]:mt-3 [&_h1]:mb-1 [&_h1]:text-base [&_h1]:font-semibold
                                                    [&_h2]:mt-2.5 [&_h2]:mb-1 [&_h2]:text-sm [&_h2]:font-semibold
                                                    [&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:text-sm [&_h3]:font-semibold
                                                    [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-white/30 [&_blockquote]:pl-3 [&_blockquote]:text-gray-300
                                                    [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/50 [&_pre]:p-3
                                                    [&_code]:rounded [&_code]:bg-black/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.825rem]
                                                    [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                                    [&_table]:my-3 [&_table]:w-full [&_table]:min-w-0 [&_table]:border-collapse [&_table]:text-left
                                                    [&_th]:border [&_th]:border-white/10 [&_th]:px-2.5 [&_th]:py-1.5 [&_th]:font-semibold
                                                    [&_td]:border [&_td]:border-white/10 [&_td]:px-2.5 [&_td]:py-1.5
                                                    [&_hr]:my-3 [&_hr]:border-white/10
                                                `}
                                            >
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {message.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={bottomRef} />
                            </div>
                        )}
                    </div>

                    <ChatInput onCreate={onCreate} department={department} />
                </div>
            </div>
        </div>
    )
}
