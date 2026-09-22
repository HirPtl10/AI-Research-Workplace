import Department from "./Department"
export default function DepartmentList({ departments, onDelete, setSelect, selectedDept }) {

    return (
        <div className="mt-6 flex-1 overflow-y-auto px-3">

            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                Your departments
            </p>

            <div className="space-y-1">

                {departments.map(department => (
                    <Department department={department} onDelete={onDelete} setSelect={setSelect} selected={selectedDept?.id === department.id} />
                ))}

            </div>

        </div>
    )
}