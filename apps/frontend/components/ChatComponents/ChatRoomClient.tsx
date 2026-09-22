"use client"
import ChatInput from "./ChatInput"

export default function ChatRoomClient({messages, department, onCreate}) {
    console.log(messages)
    return (
        <div className="flex h-full min-h-0 flex-col">
            <header className="flex shrink-0 items-center gap-3 border-b border-white/5 px-6 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2a2a2a] text-xs font-medium text-gray-300">
                    {department.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-white">{department.name}</h2>
                    <p className="text-xs text-gray-500">Department chat</p>
                </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-500">No messages yet. Start the conversation below.</p>
                    </div>
                ) : (
                    <div className="mx-auto flex max-w-3xl flex-col gap-3">
                        {messages.map((message) => {
                            const isUser = message.role === "user";
                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`
                                            max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                                            ${isUser
                                                ? "rounded-br-md bg-white text-black"
                                                : "rounded-bl-md bg-[#2a2a2a] text-gray-100"
                                            }
                                        `}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <ChatInput onCreate={onCreate} department={department} />
        </div>
    )
}
