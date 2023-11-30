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

        registros.registros.forEach((pedido, index) => {
            nmrPedido.push(pedido.numeroPedido);
            totalPedido.push(pedido.totalPedido);
            var produtosArray = pedido.produtos.split(', ');
            var obj = {
            numeroPedido: pedido.numeroPedido,
            produtos: produtosArray,
            };

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
                    <TableFooter key={index} >Valor pedido: R${totalPedido[index]}</TableFooter>
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