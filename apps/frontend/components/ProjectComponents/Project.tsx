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
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            {
                    <div key={project.id} style={{margin: "8px"}}>
                        <Link href={`/projects/${project.id}`}>{project.name}</Link>
                    </div>
            }
        </div>
    )
}