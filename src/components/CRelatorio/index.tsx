import { Table, Row} from "react-native-table-component";
import { Container, Title} from "./styles";
import {TouchableOpacityProps} from "react-native";
import React from "react";
import { CColumn } from "../CColumn";
import { Coluna } from "../../modules/Empresa/styles";
import {StyleSheet, Text, View} from 'react-native';

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
    let produtos:produtos[] = [];
    
    registros.registros.forEach((pedido, index) => {
        nmrPedido.push(pedido.numeroPedido);

        var produtosArray = pedido.produtos.split(', ');
        var obj = {
        numeroPedido: pedido.numeroPedido,
        produtos: produtosArray,
        };

        produtos.push(obj);
    });

    return (
        <View>
        {produtos.map((pedido, index) => (
            <View key={index}>
            <Text style={[styles.text, styles.tableHead]}>{`Pedido nº ${pedido.numeroPedido}`}</Text>
            {pedido.produtos.map((produto, produtoIndex) => (
                <Text key={produtoIndex} style={[styles.tableRow]}>{produto}</Text>
            ))}
            </View>
        ))}
        <Text style={styles.tableFooter}>{`Total: R$ ${registros.totalizador.valor}`}</Text>
        </View>
    );
    } else {
    return (
        <>
        <View>
            <Text style={styles.textEmpty}>Nenhuma informação carregada</Text>
        </View>
        </>
    );
    }
  }

const styles = StyleSheet.create({
    container: {
        marginTop: '20%',
        marginBottom: '30%',
        backgroundColor: 'white',
        color: 'white',
        paddingEnd: '1%',
        paddingStart: '1%',
        borderWidth: 5,
        borderColor: 'red'
    },

    tableHead:{
        padding: 5,
        backgroundColor: 'white',
        marginBottom: 5
    },

    tableRow:{
        textAlign: 'center',
        backgroundColor: 'gray',
        padding: 5,
        fontSize: 25,
        marginBottom: 5,
        marginHorizontal: 3
        
    },

    tableFooter: {
        
        color: 'black',
        fontSize: 40,
        backgroundColor: 'white'
    },

    textEmpty: {
        color: 'white',
        fontSize: 20,
        marginTop: '2%',
        marginBottom: '2%',
    },

    text: {
        color: 'black',
        fontSize: 33,
    }
})