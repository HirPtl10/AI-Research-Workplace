import Project from "./Project";

export default function ProjectsList({projects}) {
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