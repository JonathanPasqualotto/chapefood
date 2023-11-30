import { Table } from "react-native-table-component";
import { Container, Text } from "./styles";
import {TouchableOpacityProps} from "react-native";
import React from "react";
import {View} from 'react-native';

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

                <Container>
                    <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
                        {nmrPedido.map((numero, index) => (
                            <Text key={index}>Pedido Nº {numero}</Text>
                        ))}
                        <Text style={{ fontWeight: 'bold' }}>Total: R$ {registros.totalizador.valor}</Text>
                    </Table>
                </Container>
                
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

 