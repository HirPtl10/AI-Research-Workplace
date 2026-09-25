"use client"
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/router";

export default function Signin() {
    let router = useRouter();
    let [data, setData] = useState({
        username: '',
        password: ''
    })

    function handleChange(e: any) {
        let { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }
    let [finalRes, setFinalRes] = useState("");

    let handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:3001/signin', {
                'username': data.username,
                'password': data.password
            },
                {
                    withCredentials: true
                }
            )
            setFinalRes(res.data.message);
            setTimeout(() => {
                router.push("/dashboard");
            }, 700)
        } catch (e: any) {
            setFinalRes(e.response?.data?.message || "Sign in failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sign In</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Welcome back to your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input 
                            name="username" 
                            value={data.username} 
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input 
                            type="password"
                            name="password" 
                            value={data.password} 
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Enter password"
                        />
                    </div>
                    {finalRes && (
                        <div className="text-sm text-center text-red-500 dark:text-red-400 font-medium">
                            {finalRes}
                        </div>
                    )}
                    <button 
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}