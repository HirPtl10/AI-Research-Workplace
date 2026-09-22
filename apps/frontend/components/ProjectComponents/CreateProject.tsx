import { useState } from "react"

export default function CreateProject({ onCreate }: { onCreate: Function}) {
    const [name, setName] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        onCreate(name);

        setName("");
    }

    function handleChange(e: React.FormEvent) {
        let value = e.target.value;

        setName(value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={name} onChange={handleChange} placeholder="Enter name of project"></input>
            <button type="submit">Submit</button>
        </form>
    )
}