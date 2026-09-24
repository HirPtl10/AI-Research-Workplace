import type { Department as DepartmentType } from "@repo/common-types"

type Props = {
    department:DepartmentType,
    onDelete: (id: string) => void,
    setSelect: (department: DepartmentType) => void,
    selected: boolean
}

export default function Department({ department, onDelete, setSelect, selected }: Props) {

    return (
        <>
            <div 
                key={department.id}
                className={`
                group
                flex w-full
                items-center
                rounded-lg
                px-3 py-2.5
                text-sm
                transition
                ${selected
                    ? "bg-[#2a2a2a] text-white"
                    : "text-gray-300 hover:bg-[#2a2a2a]"
                }
            `}
            >

                {/* Left side */}
                <div className="flex min-w-0 flex-1 items-center" onClick={() => setSelect(department)}>

                    {/* Department icon */}
                    <span
                        className="
                        mr-3
                        flex h-7 w-7
                        shrink-0
                        items-center justify-center
                        rounded-md
                        bg-[#2a2a2a]
                        text-xs font-medium
                        text-gray-400
                    "
                    >
                        {department.name.charAt(0).toUpperCase()}

                    </span>

                    {/* Department name */}
                    <span className="truncate">
                        {department.name}
                    </span>

                </div>

                {/* Right side */}
                <button
                    onClick={() => onDelete(department.id)}
                    className="
                    ml-2
                    shrink-0
                    rounded-md
                    px-2 py-1
                    text-xs
                    text-gray-500
                    opacity-0
                    transition
                    hover:bg-red-500/10
                    hover:text-red-400
                    group-hover:opacity-100
                "
                >
                    Delete
                </button>

            </div>
        </>
    )
}