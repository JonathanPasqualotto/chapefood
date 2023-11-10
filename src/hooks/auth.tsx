import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../utils/api";
import {Alert} from "react-native";
import axios from "axios";

interface Props{
    children: ReactNode
}

interface SingInCredentials{
    usuario: string
    senha: string
}

interface IAuthContextData{
    user: SingInCredentials
    signIn: (credentials : SingInCredentials) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children } : Props){
    const [user, setUser ] = useState({} as SingInCredentials)


    async function signIn({ usuario, senha } : SingInCredentials){
        await AsyncStorage.setItem('@chapeffod:usuario', usuario)
        await AsyncStorage.setItem('@chapefood:senha', senha)

        try {
            const request = await api.post('/auth/login', {
                login: usuario,
                senha
            })
            const data = request.data
            const statusCode = request.status
            if (statusCode === 200){
                setUser({ usuario, senha })
            } else {
                throw { message: data.message, statusCode }
            }
        } catch(error) {
            if (axios.isAxiosError(error) && error.response?.status === 401){
                return Alert.alert('Não atuorizado','Verifique os dados se estão corretos', [{ text: 'Ok' }])
            }
        }
    }


    async function signOut(){
        await AsyncStorage.removeItem('@chapefood:usuario')
        setUser({} as SingInCredentials)
    }

    useEffect(() => {
        (async function loadUserData(){
            const usuario = await AsyncStorage.getItem('@chapefood:usuario')
            if (!!usuario){
                setUser({ usuario, senha: "" })
            }
        })()
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() : IAuthContextData {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth}