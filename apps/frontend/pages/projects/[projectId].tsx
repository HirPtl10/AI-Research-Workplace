import { api } from "../../lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateDepartment from "../../components/DepartmentComponents/CreateDepartment";
import DepartmentList from "../../components/DepartmentComponents/DepartmentList";
export default function ProjectPage() {

    const router = useRouter();
    const { projectId } = router.query;
    const [departmentList, setDepartmentList] = useState<any[]>([]);

    async function getDepartment() {
        try {
            const res = await api.get(`/getDepartments/${projectId}`);
            setDepartmentList(res.data);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    async function deleteDepartment(id: string) {
        console.log("Id to be deleted: " + id);
        try {
            await api.delete(`deleteDepartment/${id}`);
            setDepartmentList(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    async function createDepartment(name: string) {
        console.log("hee")
        try {
            const res = await api.post(
                `/createDepartment/${projectId}`,
                {
                    name: name
                },
            );

            setDepartmentList(prev => [
                ...prev,
                res.data
            ]);
            console.log(res.data)

        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    useEffect(() => {
        if (!router.isReady) return;

        getDepartment();
    }, [router.isReady, projectId]);

    return (
        <aside className="flex h-screen w-72 flex-col bg-[#171717] text-white">

            {/* Header */}
            <div className="px-4 py-5">
                <h1 className="text-lg font-semibold">
                    Departments
                </h1>
            </div>

            {/* Create department */}
            <CreateDepartment onCreate={createDepartment} />

            {/* Department list */}
            <DepartmentList departments={departmentList} onDelete={deleteDepartment} />

        </aside>
    );
}