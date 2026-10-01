import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/60 px-4 sm:px-8 py-3 transition-colors">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-xl text-gray-900 dark:text-white hover:opacity-90 transition-opacity">
                    <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">AI Workplace</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link 
                        href="/dashboard" 
                        className={`text-sm font-medium transition-colors ${
                            router.pathname === '/dashboard' 
                                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        href="/logout" 
                        className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </header>
    );
}
