import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProjectPage() {
    let [formData, setFormData] = useState({
        name: ""
    })
    const router = useRouter();
    let [deparmentList, setDepartmentList] = useState<any[]>([]);
    const { projectId } = router.query;
    async function getDepartment() {
        try {
            let res = await axios.get(`http://localhost:3001/getDepartments/${projectId}`,
                {
                    withCredentials: true
                }
            )

            setDepartmentList(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function createDepartment() {
        try {
            let res = await axios.post(`http://localhost:3001/createDepartment/${projectId}`, {
                name: formData.name
            }, 
        {
            withCredentials: true
        })

        setDepartmentList(prev => [
            ...prev,
            res.data
        ])
        } catch(err) {
            console.log(err.response.data.message);
        }
    }

    function handleChange(e) {
        let { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    useEffect(() => {
        if (!router.isReady) return;
    
        getDepartment();
    }, [router.isReady, projectId]);
    return (
        <div>
            <input name="name" value={formData.deptName} onChange={handleChange} placeholder="Enter new dept name"></input>
            <button onClick={createDepartment}>Create Dept</button> <br></br><hr></hr>
            {
            deparmentList.map(department => (
                <div key={department.id}>
                    {department.name}    
                </div>
            ))}
        </div>
    )
}