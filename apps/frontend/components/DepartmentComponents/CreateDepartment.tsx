import { useState } from "react";

export default function CreateDepartment({ onCreate }: {onCreate: (name: string) => void}) {
    const [name, setName] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const value  = e.target.value;

       setName(value);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        onCreate(name);

        setName("");
    }
    return (
        <div className="px-3">
                <div className="flex items-center gap-2">

                    <input
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="New department..."
                        className="
                        min-w-0 flex-1
                        rounded-lg
                        border border-transparent
                        bg-[#2a2a2a]
                        px-3 py-2
                        text-sm text-white
                        outline-none
                        placeholder:text-gray-500
                        focus:border-gray-600
                    "
                    />

                    <button type="submit"
                        onClick={handleSubmit}
                        className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-lg
                        bg-white
                        text-xl font-medium text-black
                        transition
                        hover:bg-gray-200
                        active:scale-95
                    "
                    >
                        +
                    </button>

                </div>
            </div>
    )
}
