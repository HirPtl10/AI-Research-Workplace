import Project from "./Project";
import type { Project as ProjectType } from "@repo/common-types";

export default function ProjectsList({projects}: {projects: ProjectType[]}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                projects.map(project => (
                    <Project key={project.id} project={project}/>                    
                ))
            }
        </div>
    )
}