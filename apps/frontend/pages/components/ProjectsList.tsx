"use client"

import axios from "axios";
import Link from "next/link"

export default function ProjectsList({ projects }) {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            {
                projects.map(project => (
                    <div key={project.id} style={{margin: "8px"}}>
                        <Link href={`/projects/${project.id}`}>{project.name}</Link>
                    </div>
                ))
            }
        </div>
    )
}