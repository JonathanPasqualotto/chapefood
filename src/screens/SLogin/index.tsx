import React, {useState} from "react";
import  { Input, Logo, Input1 } from './styles'
import {CButton} from "../../components/CButton";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import * as Yup from 'yup'
import {Alert} from "react-native";
import {AxiosError} from "axios";
import {CLoader} from "../../components/CLoader";
import {useAuth} from "../../hooks/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SLogin(){
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoading, setIsLoading] = useState(false)
   // const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    const { signIn } = useAuth()

    async function handleSignIn() {
        try {
            setIsLoading(true)

            const shema = Yup.object().shape({
                usuario: Yup.string()
                    .required(),
                senha: Yup.string()
                    .required()
            })
            await shema.validate({usuario, senha})
            await AsyncStorage.setItem('@chapefood:usuarioLogado', usuario)
            await AsyncStorage.setItem('@chapefood:senhaLoagdo', senha)
            await signIn({ usuario, senha })
        }
        catch (error) {
            setIsLoading(false)
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Verifique os dados', error.errors.join('\n'))
            }

            const erro = `${(error as Error).message}\n\n${((error as AxiosError).response?.data ?? "") as string}`
            return Alert.alert('Erro na autenticação', erro)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (

        <Logo source={require('../../../assets/inicio.png')}>
            <CLoader isLoading={isLoading} />
            <Input
                placeholder="Usuário"
                autoCapitalize='none'
                onChangeText={setUsuario}
                value={usuario}

            />
            <Input1
                placeholder="Senha"
                secureTextEntry={true}
                autoCapitalize='none'
                onChangeText={setSenha}
                value={senha}
            />
            <CButton onPress={handleSignIn} title="Login"/>
        </Logo>
    )
}