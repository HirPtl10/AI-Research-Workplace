"use client"

import axios from "axios";
import Link from "next/link"

export default function Project({ project }) {
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