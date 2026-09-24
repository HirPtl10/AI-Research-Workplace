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
        <>
        <div className="projects">
            <CreateProject onCreate={newProject} /> 
            <ProjectsList projects={projects} />
        </div>
        </>
    )
}