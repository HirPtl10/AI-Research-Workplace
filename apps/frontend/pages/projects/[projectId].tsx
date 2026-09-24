import { api } from "../../lib/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateDepartment from "../../components/DepartmentComponents/CreateDepartment";
import DepartmentList from "../../components/DepartmentComponents/DepartmentList";
import ChatRoom from "../../components/ChatComponents/ChatRoom";
import { AxiosError } from "axios";
export default function ProjectPage() {

    const router = useRouter();
    const { projectId } = router.query;
    const [departmentList, setDepartmentList] = useState<any[]>([]);
    const [selectedDept, setSelectedDept] = useState<any>(null);

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
        } catch (err: unknown) {
            //@ts-ignore
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
        <div className="flex h-screen">
        <aside className="relative z-20 flex h-screen w-72 shrink-0 flex-col overflow-hidden bg-[#171717] text-white">

            {/* Header */}
            <div className="px-4 py-5">
                <h1 className="text-lg font-semibold">
                    Departments
                </h1>
            </div>

            <CreateDepartment onCreate={createDepartment} />
            <DepartmentList departments={departmentList} onDelete={deleteDepartment} setSelect={setSelectedDept} selectedDept={selectedDept}/>
        </aside>
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#111111]">
            {selectedDept ? (
                <ChatRoom department={selectedDept} />
            ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <p className="text-base font-medium text-gray-200">Select a department</p>
                    <p className="mt-1 max-w-sm text-sm text-gray-500">
                        Choose a department from the sidebar to open its conversation.
                    </p>
                </div>
            )}
        </main>
        <aside className="hidden h-screen w-80 shrink-0 flex-col overflow-hidden border-l border-white/5 bg-[#171717] lg:flex" />
        </div>
    );
}