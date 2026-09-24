import Project from "./Project";
import type { Project as ProjectType } from "@repo/common-types";

export default function ProjectsList({projects}: {projects: ProjectType[]}) {
    return (
        <div>
            {
                projects.map(project => (
                    <Project project={project}/>                    
                ))
            }
        </div>
    )
}