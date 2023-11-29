import { Table, Row} from "react-native-table-component";
import { Container, Title} from "./styles";
import {TouchableOpacityProps} from "react-native";
import React from "react";
import { CColumn } from "../CColumn";
import { Coluna } from "../../modules/Empresa/styles";
import {StyleSheet, Text, View} from 'react-native';

interface Registros {
    quantidadeRegistros:number,
    registros:[{
        capacidade:number,
        mesa:string,
        nomeEmpresa:string,
        nomeCliente:string,
        numeroPedido:number,
        produtos:string
        statusPedido:string,
        totalPedido:number
    }],
    totalizador: {
        descricao:string,
        valor:number
    }
};

interface Props extends TouchableOpacityProps{
    title?: string;
    registros:Registros;
};

const styles = StyleSheet.create({
    container: {
      marginTop: '30%',
      marginBottom: '30%',
      backgroundColor: 'white',
      color: 'white',
      paddingEnd: '5%',
      paddingStart: '5%',
      borderWidth: 5,
      borderColor: 'red'
    },

    text: {
        margin: 50,
        fontSize: 55,
    }
  })

export function CRelatorio({ title, registros }: Props) {
    try {
        if (Object.keys(registros).length > 0) {
            
            let nmrPedido:number[] =  [];
            let produtos:any[] = [];
            
    
            registros.registros.forEach((pedido, index) => {
                nmrPedido.push(pedido.numeroPedido);
                var produtosArray = pedido.produtos.split(','); 
                var obj = {
                    "numeroPedido": pedido.numeroPedido,
                    "produtos": produtosArray
                }
                produtos.push(obj)
            });
            
            return (
    
                <View style={styles.container}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
                        {nmrPedido.map((numero, index) => (
                            <Text key={index} style={styles.text}>`Pedido Nº {numero}`</Text>
                        ))}
                        <Text style={styles.text}>`Total: R$ {registros.totalizador.valor}`</Text>
                    </Table>
                </View>
                
            );

        } else {
            return(
                <>
                    <View>
                        <Text></Text>
                    </View>
                </>
            ) 
        }
    } catch (error) {
      console.error("erro");
    }
  }

 