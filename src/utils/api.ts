import axios from "axios";

const api = axios.create({
    baseURL: 'https://chapefood-api.onrender.com',        //SERVER RENDER
})

export default api