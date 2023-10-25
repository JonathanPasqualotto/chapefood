import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//http://localhost:3000/usuarios
const api = axios.create({
    baseURL: 'https://chapefood-api.onrender.com',
})
export default api