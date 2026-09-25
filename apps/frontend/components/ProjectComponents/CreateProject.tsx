import { useState } from "react"

export default function CreateProject({ onCreate }: { onCreate: Function}) {
    const [name, setName] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        onCreate(name);

        setName("");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;

        setName(value);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
            <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Project</label>
                <input 
                    name="name" 
                    value={name} 
                    onChange={handleChange} 
                    placeholder="Enter name of project"
                    className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                />
            </div>
            <button 
                type="submit"
                className="w-full sm:w-auto flex-none flex justify-center py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                Create Project
            </button>
        </form>
    )
}