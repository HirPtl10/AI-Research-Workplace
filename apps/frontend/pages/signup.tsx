import axios from "axios";
import { useState } from "react";

export default function Signup() {
    let [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    let [data, setData] = useState("");
    const handleChange = (event: any) => {
        let {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

   const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
        let res = await axios.post(
            "http://localhost:3001/signup",
            {
                username: formData.username,
                password: formData.password
            },
            { withCredentials: true }
        );

        setData(res.data.message)
    } catch (err: any) {
        setData(err.response?.data?.message || "Signup failed");
    }
};
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sign Up</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Create a new account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4"> 
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input 
                            name="username" 
                            value={formData.username} 
                            placeholder="Enter username" 
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            placeholder="Enter password" 
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    {data && (
                        <div className="text-sm text-center text-red-500 dark:text-red-400 font-medium">
                            {data}
                        </div>
                    )}
                    <button 
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}