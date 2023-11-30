import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OrdemServicoCard from './OrdemServicoCard';
import { ScrollView } from 'react-native';
import api from '../../../utils/api';

interface OrdemServico {
  id_pedido_produto: number;
  id_produto: number;
  status: string;
  descricao: string;
  pedido: number;
  quantidade: number;
}

const ListagemOrdemServico: React.FC = () => {
  const [data, setData]= useState<OrdemServico[]>([]);

  const loadOrders = async ()=>{   
    try {
      const response = await api.get('/pedidos/ordens')
      const json = response.data;
      setData(json)
    } catch(error){
      console.log(error);
    }
  }
  
  useEffect(()=>{
    loadOrders();
  },[])

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((item, index)=>{
          return(
            <OrdemServicoCard 
              key={index} 
              status={item.status} 
              produto={item.descricao}
              quantidade={item.quantidade}
              id_pedido={item.pedido}
              id_ordem={item.id_pedido_produto}
              onSucess={()=>{
                loadOrders();
              }}
            />
          )
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontFamily: 'system-ui'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#84CAE8',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 16,
    paddingLeft: 8,
    fontFamily: 'system-ui'
  },
  button: {
    backgroundColor: '#84CAE8',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'system-ui'
  },
});

export default ListagemOrdemServico;
