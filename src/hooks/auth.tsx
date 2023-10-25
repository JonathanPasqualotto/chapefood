import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../utils/api";
import {Alert} from "react-native";

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

        await api.get('/usuarios')
            .then(response=>{
                let achou = false
                for (var i in response.data){
                    if (response.data[i].login === usuario && response.data[i].senha === senha) {
                            usuario = response.data[i].login
                            senha = response.data[i].senha
                            setUser({ usuario, senha })
                            achou = true
                    }
                }

                if (achou === false) {
                    Alert.alert('Erro de Autenticação', `Login ou Senha incorretos`, [{ text: 'OK'}]);
                }

            })
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