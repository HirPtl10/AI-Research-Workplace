import axios from "axios"
import { useState } from "react";
import { useRouter } from "next/router";

export default function Logout() {
    const router = useRouter();
    let [data, setData] = useState("");
    let handleLogout = async () => {
        try {
            console.log("Inside handle")
            let res = await axios.post("http://localhost:3001/logout", {}, {
                withCredentials: true,
            });
            router.push("/signin");
            console.log(res.data.message);

        } catch (e: any) {
            setData(e.response?.data?.message || "Logout failed");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center space-y-6">
                <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign Out</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Are you sure you want to sign out of your session?</p>
                </div>
                {data && (
                    <div className="text-sm text-red-500 font-medium">
                        {data}
                    </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={() => router.back()}
                        className="w-full py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-sm shadow-sm transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}