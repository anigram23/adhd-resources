import axios from "axios";

const baseURL = "http://localhost:8080/api";

const http = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export default http;