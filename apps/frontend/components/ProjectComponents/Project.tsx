"use client"

import axios from "axios";
import Link from "next/link"
import { useEffect } from "react";
import { api } from "../../lib/api";

type Project = {
    name: string,
    id: string
}

export default function Project({ project, delProject }: {project: Project, delProject: Function}) {
    useEffect(() => {
        console.log("PROJCT" + project)
    },[]) 

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const confirmed = window.confirm(`Are you sure you want to delete "${project.name}"?`);
        if (confirmed) {
            delProject(project.id)
        }
    };

    return (
        <Link href={`/projects/${project.id}`} className="group block h-full">
            <div className="h-full flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                    </div>
                    <button
                        type="button"
                        onClick={handleDelete}
                        title="Delete project"
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.name}
                </h3>
            </div>
        </Link>
    )
}