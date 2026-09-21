import axios from "axios";
import { useState } from "react";

export default function Signup() {
    let [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    let [data, setData] = useState("");
    const handleChange = (event: any) => {
        let {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

   const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
        let res = await axios.post(
            "http://localhost:3001/signup",
            {
                username: formData.username,
                password: formData.password
            },
            { withCredentials: true }
        );

        setData(res.data.message)
    } catch (err) {
        console.error("Signup failed");
    }
};
    return (
        <>
        <form onSubmit={handleSubmit}> 
            <label>Name</label>
            <input name="username" value={formData.username} placeholder="Enter username" onChange={handleChange}></input>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange}></input>
            <button type="submit">Submit</button>
        </form>
        <h1>{data}</h1>
        </>
    )
}