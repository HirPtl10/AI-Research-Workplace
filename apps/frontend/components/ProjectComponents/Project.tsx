"use client"

import axios from "axios";
import Link from "next/link"
import { useEffect } from "react";

type Project = {
    name: string,
    id: string
}

export default function Project({ project }: {project: Project}) {
    useEffect(() => {
        console.log("PROJCT" + project)
    },[]) 
    return (
        <Link href={`/projects/${project.id}`} className="group block h-full">
            <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.name}
                </h3>
            </div>
        </Link>
    )
}