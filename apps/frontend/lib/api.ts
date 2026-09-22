import axios from "axios";

export let api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true
})