import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from "../database";
import { Usuario } from "../database/modules/Usuario";

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
    const  [user, setUser ] = useState({} as SingInCredentials)

    async function signIn({ usuario, senha } : SingInCredentials){
        let usuarioLogado = await database.getRepository(Usuario).createQueryBuilder().where("LOWER(_usuario) = LOWER(:usuario) and _senha = :senha", { usuario, senha}).getOne();

        if (usuarioLogado){
            let usuarioAntigo = await AsyncStorage.getItem('@chapefood:usuario')
            let usuarioNovo = false
            if (usuarioAntigo != usuario){
                usuarioNovo = true
                await AsyncStorage.setItem('@chapefood:usuario', String(usuarioNovo))
            }
            await AsyncStorage.setItem('@chapefood:usuario', usuario)
            await AsyncStorage.setItem('@chapefood:senha', senha)
            setUser({ usuario, senha })
        }
        else {
            throw new Error('Usuário ou Senha incorretos')
        }
    }

    async function signOut(){
        await AsyncStorage.removeItem('@chapefood:usuario')
        await AsyncStorage.removeItem('@chapefood:senha')
        setUser({} as SingInCredentials)
    }

    useEffect(() => {
        (async function loadUserData(){
            const usuario = await AsyncStorage.getItem('@chapefood:usuario')
            const senha = await AsyncStorage.getItem('@chapefood:senha')
            if (!!usuario){
                setUser({ usuario, senha: senha ?? "" })
            }
        })()
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() : IAuthContextData {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth}