import axios from "axios";

//http://localhost:3000/usuarios
const api = axios.create({
    //baseURL: 'https://chapefood-api.onrender.com',        //SERVER RENDER
    baseURL: 'http://192.168.0.126:3000',           // LOCAL
   // baseURL: 'http://172.20.10.3:3000'                // CELULAR
})

export default api