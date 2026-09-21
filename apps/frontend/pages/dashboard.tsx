"use client"
import axios from "axios"
import { useEffect, useState } from "react";
import ProjectsList from "./components/ProjectsList";

export default function Dashboard() {
    let [projects, setProjects] = useState<Project[]>([]);
    async function fetchProjects() {
        try {
            let res = await axios.get("http://localhost:3001/getProjects", {
                withCredentials: true
            })
            console.log(res);
            setProjects(res.data);
        } catch(e) {
            console.log(e);
        }
    }
    let [formData, setFormData] = useState({
        projectName: ""
    })
    function handleChange(e) {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        }) 
    }
    async function newProject(e) {
        try {
            e.preventDefault()
            let res = await axios.post("http://localhost:3001/createProject", {
                projectName: formData.projectName
            }, {
                withCredentials: true
            })

            setProjects(prev => [
                ...prev,
                res.data
            ])
        } catch(err) {
            console.log(err.response.data.message);
        }
    }
    useEffect(() => {
        fetchProjects();
    }, [])
    return (
        <>
        <input name="projectName" type="text" value={formData.projectName} onChange={handleChange} placeholder="Enter project name"/> <br></br><br></br>
        <button onClick={newProject}>Create Project</button>
        <hr></hr>
        <br></br>
        <div className="projects">
            <ProjectsList projects={projects} />
        </div>
        </>
    )
}