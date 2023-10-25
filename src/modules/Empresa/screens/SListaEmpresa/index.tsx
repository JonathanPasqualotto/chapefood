import React from "react";
import { CCabecalhoHome} from "../../../../components/CCabecalhoHome";
import {Container, Text} from "./styles";
import {CColumn} from "../../../../components/CColumn";
import {CRow} from "../../../../components/CRow";
import {CButton} from "../../../../components/CButton";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import {CIconButton} from "../../../../components/CIconButton";
import api from "../../../../utils/api";
import {useEffect, useState} from "react";

interface empresaProps{
    nome?: string;
    codigo?: number;
    route?: string;
}

export function SListaEmpresa({ nome, codigo, route }: empresaProps) {
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    const [ empresas, setEmpresas ] = useState([])

    class MyText extends React.Component {
        handleConsultaEmpresa = () => {
            // Supondo que 'codigo' é uma propriedade de 'route.params'
            const codigo = route.params.codigo;
            // Navegue para a tela 'AlterarEmpresa' e passe 'codigo' como um parâmetro
            navigation.navigate('NovaEmpresa', {codigo});
        };
    }


    // function handleConsultaEmpresa(){
    //     navigation.navigate('NovaEmpresa', {codigo})
    // }

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
                            <CIconButton onPress={handleConsultaEmpresa} iconName="edit" color="black" size={45} />
                            <CIconButton onPress={handleConsultaEmpresa} iconName="trash" color="red" size={45} />
                        </CRow>
                        )
                })}
            </CColumn>

        </Container>
    )
}