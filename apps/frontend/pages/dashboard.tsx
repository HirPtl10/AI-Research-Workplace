"use client"
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import ProjectsList from "../components/ProjectComponents/ProjectsList";
import CreateProject from "../components/ProjectComponents/CreateProject";
import type { Project } from "@repo/common-types";

export default function Dashboard() {
    let [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        fetchProjects();
    }, []);
    async function fetchProjects() {
        try {
            let res = await api.get("/getProjects")
            console.log(res);
            setProjects(res.data);
        } catch(e) {
            console.log(e);
        }
    }
    async function newProject(name: string) {
        try {
            let res = await api.post("/createProject", {
                name: name
            });

            setProjects(prev => [
                ...prev,
                res.data
            ])
        } catch(err: unknown) {
            //@ts-ignore
            console.log(err.response.data.message);
        } 
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your projects and workspaces.</p>
                </header>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <CreateProject onCreate={newProject} /> 
                </div>
                <div>
                    <ProjectsList projects={projects} />
                </div>
            </div>
        </div>
    )
}