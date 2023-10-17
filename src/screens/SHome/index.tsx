import React from "react";
import {Container, Title, MenuGrid, TextButton, Header, Body, MenuItem} from "./styles";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { CCabecalhoHome } from "../../components/CCabecalhoHome";

export function SHome(){
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    function handleLinha() {
        navigation.navigate('Linha')
    }

    function handleEmpresa(){
        navigation.navigate('ListaEmpresa')
    }

    return (
        <Container>
            <CCabecalhoHome title="CHAPEFOOD" />
            <Body>
                <MenuGrid>
                    <MenuItem onPress={handleEmpresa}>
                        <TextButton>Empresa</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleLinha}>
                        <TextButton>Usuários</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleLinha}>
                        <TextButton>Relatórios</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleLinha}>
                        <TextButton>Mesas</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleLinha}>
                        <TextButton>Produtos</TextButton>
                    </MenuItem>
                </MenuGrid>
            </Body>
        </Container>
    );
}