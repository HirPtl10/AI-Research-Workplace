import { useState } from "react"

export default function ChatInput({ onCreate, department }) {
    let [message, setMessage] = useState("")

    function handleChange(e) {
        let value = e.target.value;
        setMessage(value);
    }

    async function handleSubmit() {
        await onCreate(message, "user", department.conversation.id)
        setMessage("")
    }
    return (
        <div>
        <input name="message" value={message} onChange={handleChange}></input>
        <button onClick={handleSubmit}>Send</button>
        </div>
    )
}