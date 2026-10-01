import { api } from "../../lib/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateDepartment from "../../components/DepartmentComponents/CreateDepartment";
import DepartmentList from "../../components/DepartmentComponents/DepartmentList";
import ChatRoom from "../../components/ChatComponents/ChatRoom";
import axios, { AxiosError } from "axios";
import ErrorComponent from "../../components/Error/ErrorComponent";
export default function ProjectPage() {

    const router = useRouter();
    const { projectId } = router.query;
    const [departmentList, setDepartmentList] = useState<any[]>([]);
    const [selectedDept, setSelectedDept] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState({
        exsist: false,
        statusCode: 200,
        message: ""
    });

    async function getDepartment() {
        try {
            const res = await api.get(`/getDepartments/${projectId}`);
            setDepartmentList(res.data);
            console.log(res);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError({
                    exsist: true,
                    statusCode: err.response?.status || 500,
                    message: err.response?.data.message || "Something went wrong, Please try again later"
                })
              }
        }
    }
    async function deleteDepartment(id: string) {
        console.log("Id to be deleted: " + id);
        try {
            await api.delete(`deleteDepartment/${id}`);
            setDepartmentList(prev => prev.filter(d => d.id !== id));
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data?.message);
              }
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


    if(error.exsist) {
        return (
            <ErrorComponent
              statusCode={error.statusCode}
              message={error.message }
            />
          );
    }
    return (
        <div className="flex h-screen bg-[#111111] overflow-hidden">
            {/* Mobile backdrop */}
            {isSidebarOpen && (
                <div 
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`
                    fixed inset-y-0 left-0 z-30 flex h-full w-72 flex-col bg-[#171717] border-r border-white/5 text-white transition-transform duration-300 ease-in-out
                    lg:static lg:translate-x-0
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => router.push("/dashboard")}
                            title="Back to Dashboard"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h1 className="text-base font-semibold truncate">Departments</h1>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 lg:hidden"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-3">
                    <CreateDepartment onCreate={createDepartment} />
                </div>
                <DepartmentList 
                    departments={departmentList} 
                    onDelete={deleteDepartment} 
                    setSelect={(dept) => {
                        setSelectedDept(dept);
                        setIsSidebarOpen(false);
                    }} 
                    selectedDept={selectedDept}
                />
            </aside>

            {/* Main Area */}
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#111111]">
                {/* Mobile Top bar */}
                <div className="flex items-center justify-between border-b border-white/5 bg-[#171717] px-4 py-3 lg:hidden">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/5"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span>Departments</span>
                    </button>
                    <button 
                        onClick={() => router.push("/dashboard")}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                        Dashboard &rarr;
                    </button>
                </div>

                {selectedDept ? (
                    <ChatRoom department={selectedDept} />
                ) : (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <div className="mb-4 p-4 rounded-2xl bg-[#171717] border border-white/5 text-blue-500 shadow-xl">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-base font-medium text-gray-200">Select a department</p>
                        <p className="mt-1 max-w-sm text-sm text-gray-500">
                            Choose a department from the sidebar to open its chat room and collaborate.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}