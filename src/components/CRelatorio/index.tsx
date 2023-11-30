import { Table, Row} from "react-native-table-component";
import {Container, TableFooter, TableHead, TextEmpty, Body, TableRow, Total, Footer} from "./styles";
import {TouchableOpacityProps} from "react-native";
import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import {CColumn} from "../CColumn";

export interface iPedido{
    capacidade:number,
    mesa:string,
    nomeEmpresa:string,
    nomeCliente:string,
    numeroPedido:number,
    produtos:string,
    statusPedido:string,
    totalPedido:number
}

export interface iTotalizador {
    descricao: string;
    valor: number;
}

export type iRegistros = {
    quantidadeRegistros: number;
    registros: iPedido[];
    totalizador: iTotalizador;
} 

type produtos = {
    numeroPedido: number,
    produtos: string[]
}

interface Props extends TouchableOpacityProps{
    registros?:iRegistros;
};

export function CRelatorio({ registros }: Props) {
    
    if (registros) {
        let nmrPedido: number[] = [];
        let totalPedido: number[] = [];
        let produtos:produtos[] = [];
        let empresas:string[] = [];

        registros.registros.forEach((pedido, index) => {
            nmrPedido.push(pedido.numeroPedido);
            totalPedido.push(pedido.totalPedido);

            let produtosArray = pedido.produtos.split(', ');
            let obj = {
                numeroPedido: pedido.numeroPedido,
                produtos: produtosArray,
            };

            empresas.push(pedido.nomeEmpresa);



            produtos.push(obj);
    });

    return (
        <Container>
            {produtos.map((pedido, index) => (
                <Body key={index}>
                <TableHead>{`Pedido nº ${pedido.numeroPedido}`}</TableHead>
                {pedido.produtos.map((produto, produtoIndex) => (
                    <TableRow key={produtoIndex}>{produto}</TableRow>
                ))}
                    <TableFooter key={index} >R${totalPedido[index]} - {empresas[index]}</TableFooter>
                </Body>
            ))}
            <Total>Total: R${(registros.totalizador.valor).toFixed(2)}</Total>
        </Container>
    );
    } else {
    return (
        <>
        <Container>
            <TextEmpty>Nenhuma informação carregada</TextEmpty>
        </Container>
        </>
    );
    }
}