
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, Button, Alert } from 'react-native';
import api from '../../../../utils/api';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e3e3e3',
    padding: 16,
    margin: 22,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
  status: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusPronto: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusProducao: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: "green",
    width: '40%'
  },
  button2: {
    backgroundColor: "red",
    width: '40%'
  },
});

interface OrdemServicoCardProps {
  status: string,
  produto: string,
  quantidade: number,
  id_pedido: number,
  id_ordem: number
  onSucess: ()=>void;
}
const OrdemServicoCard: React.FC<OrdemServicoCardProps> = ({ 
  status, 
  produto, 
  id_pedido, 
  quantidade, 
  id_ordem,
  onSucess = ()=>{},
}) => {
  const handleIniciar = async () => {
    try {
      const request = await api.post(`/pedidos/ordem/iniciar/${id_ordem}`)
      const data = request.data
      const statusCode = request.status
      if (statusCode === 201) {
        Alert.alert('Ordem iniciada com sucesso!', '', [{text: 'OK'}])
        onSucess();
      } else {
        throw { message: data.message, statusCode }
      }
    } catch (error) {
      Alert.alert('Erro ao iniciar ordem', '', [{text: 'OK'}])
      console.log(error)
    }
  }
  const handleEncerrar = async () => {
    try {
      const request = await api.post(`/pedidos/ordem/encerrar/${id_ordem}`)
      const data = request.data
      const statusCode = request.status
      if (statusCode === 201) {
        onSucess();
        Alert.alert('Ordem encerrada com sucesso!', '', [{text: 'OK'}])
      } else {
        throw { message: data.message, statusCode }
      }
    } catch (error) {
      Alert.alert('Erro no encerramento da ordem', '', [{text: 'OK'}])
      console.log(error)
    }
  }
  return (
    <View style={styles.card}>
      <Text style={status === "Pronto" ? styles.statusPronto : status === "Em Produção" ? styles.statusProducao : styles.status}>Status da Ordem: {status}</Text>
      <Text style={styles.title}>Número do Pedido: {id_pedido}</Text>
      <Text style={styles.content}>Produto: {produto}</Text>
      <Text style={styles.content}>Quantidade: {quantidade}</Text>
      <View>
        {status === 'Aguardando Produção' && (
          <TouchableOpacity style={styles.button}>
            <Button
              color={"white"}
              title="Iniciar"
              onPress={e => handleIniciar()}
            />
          </TouchableOpacity>
        )}
        {status === 'Em Produção' && (
          <TouchableOpacity style={styles.button2}>
            <Button
              color="white"
              title="Encerrar"
              onPress={e => handleEncerrar()}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  };

  export default OrdemServicoCard;