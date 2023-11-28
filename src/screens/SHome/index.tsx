import React from "react";
import {Container, Title, MenuGrid, TextButton, Header, Body, MenuItem} from "./styles";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { CCabecalhoHome } from "../../components/CCabecalhoHome";

export function SHome(){
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    function handleLinha() {
        navigation.navigate('Linha')
    }

    function handleEmpresas(){
        navigation.navigate('Empresas')
    }

    function handleUsuarios(){
        navigation.navigate('Usuarios')
    }

    function handleMesas(){
        navigation.navigate('Mesas')
    }
    function handleRelatorios(){
        navigation.navigate('Relatorios')
    }

    function handleProdutos(){
        navigation.navigate('Produtos')
    }

    function handlePedidos() {
        navigation.navigate('Pedidos')
    }

    function handleOrdemServico(){
        navigation.navigate('OrdemServico')
    }

    return (
        <Container>
            <CCabecalhoHome title="CHAPEFOOD" />
            <Body>
                <MenuGrid>
                    <MenuItem onPress={handleEmpresas}>
                        <TextButton>Empresa</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleUsuarios}>
                        <TextButton>Usuários</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleRelatorios }>
                        <TextButton>Relatórios</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleMesas}>
                        <TextButton>Mesas</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleProdutos}>
                        <TextButton>Produtos</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handlePedidos}>
                        <TextButton>Pedidos</TextButton>
                    </MenuItem>
                    <MenuItem onPress={handleOrdemServico}>
                        <TextButton>Ordem de Serviço</TextButton>
                    </MenuItem>
                </MenuGrid>
            </Body>
        </Container>
    );
}