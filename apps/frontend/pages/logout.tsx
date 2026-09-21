import axios from "axios"
import { useState } from "react";
import { useRouter } from "next/router";

export default function Logout() {
    const router = useRouter();
    let [data, setData] = useState("");
    let handleLogout = async () => {
        try {
            console.log("Inside handle")
            let res = await axios.post("http://localhost:3001/logout", {}, {
                withCredentials: true,
            });
            router.push("/signin");
            console.log(res.data.message);

        } catch (e) {
            setData(e.response.data.message);
        }
    }
    return (
        <>
            <button onClick={handleLogout}>Logout</button>
            <h1>{data}</h1>
        </>
    )
}