import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "http://localhost:3000/empresa"
})

// DESCOMENTAR QUANDO SERVER ESTIVER OK
// api.interceptors.request.use(async function (config) {
//     var host = await AsyncStorage.getItem('@chapefood:host')
//     var porta = await AsyncStorage.getItem('@chapefood:porta');
//     var servidor = await AsyncStorage.getItem('@chapefood:servidor');
//     var http = await AsyncStorage.getItem('@chapefood:usaHttp');
//     config.baseURL = http + host! + ':' + porta + '/' + servidor + '/';
//     return config
// })


const TENTATIVAS_TOT = 3;

let _tentativas = 0;
api.interceptors.response.use(response => response, async error => {
    const status = error.response ? error.response.status : null

    if (status == 401 && _tentativas < TENTATIVAS_TOT) {
        _tentativas++
        return api.request(error.config)
    }
    else if (error.message == "Network Error" && _tentativas < TENTATIVAS_TOT) {
        _tentativas++
        await new Promise(r => setTimeout(r, 1000))
        return api.request(error.config)
    }
    else {
        _tentativas = 0
        return Promise.reject(error)
    }
})
export default api