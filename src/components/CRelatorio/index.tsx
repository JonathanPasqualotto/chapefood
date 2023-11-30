import { Table } from "react-native-table-component";
import { Container, Text } from "./styles";
import {TouchableOpacityProps} from "react-native";
import React from "react";
import {View, StyleSheet} from 'react-native';

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
        <View>
        {produtos.map((pedido, index) => (
            <View key={index}>
            <Text style={[styles.text, styles.tableHead]}>{`Pedido nº ${pedido.numeroPedido}`}</Text>
            {pedido.produtos.map((produto, produtoIndex) => (
                <Text key={produtoIndex} style={[styles.tableRow]}>{produto}</Text>
            ))}
                <Text key={index} style={[styles.tableFooter]}>Valor pedido: R${totalPedido[index]}</Text>
            </View>
            
        ))}
        <Text style={styles.total}>{`Total: R$ ${registros.totalizador.valor}`}</Text>
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
        backgroundColor: 'white',
        color: 'white',
        marginTop: '20%',
        marginBottom: '30%',
        marginEnd: '30%',
        marginStart: '5%',
        borderWidth: 5,
        borderColor: 'red'
    },

    tableHead:{
        padding: 5,
        backgroundColor: '#5c5c5c',
        marginBottom: 5,
    },

    tableFooter:{
        padding: 5,
        backgroundColor: '#c4c4c4',
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 'bold'
        
    },

    tableRow:{
        textAlign: 'center',
        backgroundColor: 'gray',
        padding: 5,
        fontSize: 25,
        marginBottom: 5,
    },

    total: {
        color: 'black',
        fontSize: 50,
        paddingEnd: '40%',
        paddingVertical: '5%',
        textAlign: 'left',
        backgroundColor: 'white',
        fontWeight: 'bold'
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