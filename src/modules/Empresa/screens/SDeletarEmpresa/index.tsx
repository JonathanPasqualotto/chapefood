import React from "react";
import { CCabecalhoHome} from "../../../../components/CCabecalhoHome";
import {Container, Text} from "./styles";
import {CColumn} from "../../../../components/CColumn";
import {CRow} from "../../../../components/CRow";
import {CButton} from "../../../../components/CButton";
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import {CIconButton} from "../../../../components/CIconButton";
import api from "../../../../utils/api";
import {useEffect, useState} from "react";

interface empresaProps{
    nome?: string;
    codigo?: number;
}

export function SDeletarEmpresa({ nome, codigo }: empresaProps) {
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    const [ empresas, setEmpresas ] = useState([])

    function handleEditToEmpresa(){
        navigation.navigate('AlterarEmpresa')
    }

    useEffect(() => {
        api.get('/empresas')
            .then(response=>{
                setEmpresas(response.data)
            })
    }, []);

    return (
        <Container>
            <CCabecalhoHome title='Empresa' />

            <CColumn>
                {empresas?.map(emp => {
                    return (
                        <CRow>
                            <Text>{emp.nome}</Text>
                            <Text>{emp.id}</Text>
                            <CIconButton
                                iconName="edit"
                                color="black"
                                size={45}
                                onPress={() => {
                                    navigation.navigate('AlterarEmpresa', {id: emp.id})
                                }}
                            />
                            <CIconButton onPress={handleEditToEmpresa} iconName="trash" color="red" size={45} />
                        </CRow>
                    )
                })}
            </CColumn>

        </Container>
    )
}