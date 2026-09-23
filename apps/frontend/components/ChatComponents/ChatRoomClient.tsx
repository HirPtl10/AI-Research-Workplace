"use client"
import { useEffect, useRef } from "react"
import ChatInput from "./ChatInput"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatRoomClient({messages, department, onCreate}) {
    const scrollRef = useRef(null)
    const bottomRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
            <header className="flex shrink-0 items-center gap-3 border-b border-white/5 px-8 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2a2a2a] text-xs font-medium text-gray-300">
                    {department.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-white">{department.name}</h2>
                    <p className="text-xs text-gray-500">Department chat</p>
                </div>
            </header>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col px-6 sm:px-8">
                <div className="mr-auto flex h-full min-h-0 w-full max-w-5xl flex-col">
                    <div ref={scrollRef} className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto py-3">
                        {messages.length === 0 ? (
                            <div className="flex h-full items-center justify-center">
                                <p className="text-sm text-gray-500">No messages yet. Start the conversation below.</p>
                            </div>
                        ) : (
                            <div className="flex w-full min-w-0 flex-col gap-6">
                                {messages.map((message) => {
                                    const isUser = message.role === "user";
                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex min-w-0 ${isUser ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`
                                                    min-w-0 max-w-[92%] overflow-x-auto break-words
                                                    rounded-2xl px-6 py-5 text-sm leading-7
                                                    ${isUser
                                                        ? "rounded-br-md bg-white text-black"
                                                        : "rounded-bl-md bg-[#2a2a2a] text-gray-100"
                                                    }
                                                    [&>*:first-child]:mt-0
                                                    [&>*:last-child]:mb-0
                                                    [&_p]:my-2.5
                                                    [&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
                                                    [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5
                                                    [&_li]:my-1
                                                    [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-base [&_h1]:font-semibold
                                                    [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-sm [&_h2]:font-semibold
                                                    [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold
                                                    [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-white/20 [&_blockquote]:pl-3 [&_blockquote]:text-gray-300
                                                    [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:p-3
                                                    [&_code]:rounded [&_code]:bg-black/30 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.8rem]
                                                    [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                                    [&_table]:my-4 [&_table]:w-full [&_table]:min-w-0 [&_table]:border-collapse [&_table]:text-left
                                                    [&_th]:border [&_th]:border-white/10 [&_th]:px-2.5 [&_th]:py-2 [&_th]:font-semibold
                                                    [&_td]:border [&_td]:border-white/10 [&_td]:px-2.5 [&_td]:py-2
                                                    [&_hr]:my-4 [&_hr]:border-white/10
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
