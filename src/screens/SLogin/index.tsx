import React, {useState} from "react";
import  { Input, Logo, InputSenha } from './styles'
import {CButton} from "../../components/CButton";
import * as Yup from 'yup'
import {Alert, KeyboardAvoidingView} from "react-native";
import {AxiosError} from "axios";
import {useAuth} from "../../hooks/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Platform} from "react-native";

export default function SLogin(){
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [ cargo, setCargo ] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { signIn } = useAuth()

    async function handleSignIn() {
        try {
            setIsLoading(true)

            const schema = Yup.object().shape({
                usuario: Yup.string()
                    .required(),
                senha: Yup.string()
                    .required()
            })
            await schema.validate({usuario, senha})
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
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
                <Input
                    placeholder="Usuário"
                    autoCapitalize='none'
                    onChangeText={setUsuario}
                    value={usuario}

                />
                <InputSenha
                    placeholder="Senha"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    onChangeText={setSenha}
                    value={senha}
                />
            </KeyboardAvoidingView>
            <CButton onPress={handleSignIn} title="Login"/>
        </Logo>
    )
}