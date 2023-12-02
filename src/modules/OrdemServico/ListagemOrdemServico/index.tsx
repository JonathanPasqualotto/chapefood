import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OrdemServicoCard from './OrdemServicoCard';
import { ScrollView } from 'react-native';
import api from '../../../utils/api';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [empresaLogada, setEmpresaLogada] = useState(null);

  let empresas: string[] = [];

  if (empresaLogada !== null && Array.isArray(empresaLogada)) {
    empresaLogada.map((valor) => {
      return empresas.push(valor.id.toString())
    });
  }

  const loadOrders = async ()=>{   
    try {
      const response = await api.get('/pedidos/ordens?ids='+"1,2")
      const json = response.data;
      setData(json)
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    const carregarEmpresaLogada = async () => {
      try {
        const empresaLogadaValor = await AsyncStorage.getItem('@chapefood:empresaLogada');
        if (empresaLogadaValor !== null) {
          const empresaLogadaArray = JSON.parse(empresaLogadaValor)
          setEmpresaLogada(empresaLogadaArray)
        }

      } catch (error) {
        console.error('Erro ao recuperar o valor do AsyncStorage:', error);
      }
    };

    // Chamar a função para carregar o valor do AsyncStorage
    carregarEmpresaLogada();
  }, []);
  
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
