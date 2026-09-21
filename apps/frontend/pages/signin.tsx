"use client"
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/router";

export default function Signin() {
    let router = useRouter();
    let [data, setData] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        let { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }
    let [finalRes, setFinalRes] = useState("Waiting for respponse");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post('http://localhost:3001/signin', {
                'username': data.username,
                'password': data.password
            },
                {
                    withCredentials: true
                }
            )
            setFinalRes(res.data.message);
            setTimeout(() => {
                router.push("/dashboard");
            }, 700)
        } catch (e) {
            setFinalRes(e.response.data.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input name="username" value={data.username} onChange={handleChange}></input>
                <br></br>
                <br></br>
                <label>Password</label>
                <input name="password" value={data.password} onChange={handleChange}></input>
                <h1>{finalRes}</h1>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}