import React from "react";
import  { Input, Logo, Input1 } from './styles'
import {CButton} from "../../components/CButton";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

export default function SLogin(){
    const navigation : NavigationProp<ParamListBase> = useNavigation();

    async function handleLogin() {
        navigation.navigate('Home')
    }

    return (
        <Logo source={require('../../../assets/inicio.png')}>
            <Input
                placeholder="ID"
                autoCapitalize='none'
                // keyboardType="numeric"
            />
            <Input1
                placeholder="Senha"
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <CButton onPress={handleLogin} title="Login"/>
        </Logo>
    )
}