"use client"
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import ProjectsList from "../components/ProjectComponents/ProjectsList";
import CreateProject from "../components/ProjectComponents/CreateProject";
import Navbar from "../components/Layout/Navbar";
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

    async function delProject(id: string) {
        try {
            let res = await api.delete(`/delProject/${id}`);
            setProjects(prev => prev.filter(p => p.id != id));
        } catch(err) {
            console.log("ERROR" + err);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Projects Dashboard</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and access your research projects.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <CreateProject onCreate={newProject} /> 
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                            Your Projects ({projects.length})
                        </h2>
                    </div>
                    <ProjectsList projects={projects} delProject={delProject} />
                </div>
            </main>
        </div>
    )
}