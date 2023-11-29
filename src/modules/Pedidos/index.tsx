import React, {useEffect, useState} from "react";
import api from "../../utils/api";
import {
    Coluna,
    Container,
    Footer,
    HeaderModal,
    Input,
    Text,
    TextCad,
    TextGrid,
    InputSearch,
    LinhaContainer,
    Body,
    LinhaProduto
} from "./styles";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {Alert, Modal, FlatList} from "react-native";
import {CIconButton} from "../../components/CIconButton";
import {CSelectList} from "../../components/CSelectList";

interface IPedido{
    id: number
    nomeCliente: string
    status: StatusOptions
    pedidosProdutos: any[]
    mesa: number
}

enum StatusOptions {
    Aberto = 'Aberto',
    Encerrado = 'Encerrado',
    Todos = 'Todos'
}

export function SPedidos() {
    const [ dados, setDados ] = useState([])
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false)
    const [ selected, setSelected ] = useState('')
    const [ filteredData, setFilteredData ] = useState([]);
    const [ selectMesa, setSelectMesa ] = useState([])
    const [ selectedProdutos, setSelectedProdutos ] = useState([])
    const [listProducts, setListProducts] = useState([]);
    const [selectStatus, setSelectStatus] = useState<StatusOptions[]>([
        StatusOptions.Aberto,
        StatusOptions.Encerrado,
        StatusOptions.Todos
    ]);

    // VARIAVEIS PARA EDIÇÃO
    const [ editPedidoId, setEditPedidoId] = useState(null)
    const [ editUsuario, setEditUsuario] = useState(null)
    const [ editStatus , setEditStatus ] = useState<StatusOptions[]>([
        StatusOptions.Aberto,
        StatusOptions.Encerrado,
    ]);
    const [ editSenha, setEditSenha ] = useState(null)
    const [ editLogin, setEditLogin ] = useState(null)
    const [ searchStatus, setSearchStatus ] = useState(null)

    // VARIAVEIS ṔARA EXIBIR
    const [ dispNomeCLiente, setDispNomeCLiente ] = useState(null)
    const [ dispStatus, setDispStatus ] = useState(null)
    const [ dispProdutos, setDispProdutos ] = useState(null)

    // VARIAVEIS PARA CRIAÇÃO
    const [ novoNomeCLiente, setNovoNomeCLiente ] = useState(null)
    const [ novoStatus, setNovoStatus ] = useState<StatusOptions[]>([
        StatusOptions.Aberto,
        StatusOptions.Encerrado,
    ]);
    const [ selectedMesa, setSelectedMesa ] = useState('')
    const [ selectProduto, setSelectProduto ] = useState([])
    const [ quantidade, setQuantidade ] = useState(null)
    const [ itensGrid, setItensGrid ] = useState([])



    async function handleNewPedido({ nomeCliente, mesa, pedidosProdutos }: IPedido){
        if (mesa !== null && (Array.isArray(pedidosProdutos) && pedidosProdutos.length !== 0)){
            await api.post('/pedidos/gerar', {
                nomeCliente,
                mesa,
                pedidosProdutos
            })
                .then(response => {
                    Alert.alert('Cadastro realizado com sucesso', '', [{text: 'OK'}])
                    setModalVisibleNew(false);
                    setNovoNomeCLiente(null)
                    setSelected("")
                    setFilteredData([])
                    setListProducts([]);
                    setItensGrid([])
                    setSelectProduto([])
                    setQuantidade(null)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            Alert.alert('Campos obrigatórios(*) não preenchidos ')
            setModalVisibleNew(true)
        }
    }

    function handleDeletePedido({ id }: IPedido){
        if (id !== null) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Não'}, {text: 'Sim', onPress: async () => {
                    await api.delete('/pedidos/' + id)
                        .then(resp => {
                            setModalVisibleEdit(false)
                            setEditPedidoId(null)
                            setFilteredData([])
                        })
                }}])
        }
    }

    async function handleEditPedido({ id, nomeCliente, mesa, pedidosProdutos }: IPedido) {
        if (id !== null) {
            await api.patch('/pedidos/' +id.toString(), {
                nomeCliente,
                mesa,
                pedidosProdutos
            })
                .then(response => {
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                    setEditPedidoId(null);
                    setModalVisibleEdit(false)
                    setSelected("")
                    setFilteredData([])
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    function handleAddPRoduto(){
        if (selectProduto) {
            const prodSelecionado =  selectedProdutos.find((produto) => produto.value === selectProduto)

            // GRID PARA CRIAR
            const addProdutosPedido = {
                produto: prodSelecionado.key,
                quantidade: quantidade,
                status: prodSelecionado.manufaturado ? 'Aguardando Produção' : 'Pronto'
            };

            // GRID PARA EXIBIR
            const addProdutosGrid = {
                produto: selectProduto,
                quantidade: quantidade
            }

            if (addProdutosPedido && addProdutosGrid) {
               setListProducts(prevList => [...prevList, addProdutosPedido]);
               setItensGrid(prevList => [...prevList, addProdutosGrid])
                setSelectProduto('')
                setQuantidade(null)
            }
        }
    }

    async function handleSearch({ status }: IPedido) {
        await api.get('/pedidos')
            .then(response => {
                const filteredResults = response.data.filter(item =>
                    item.status && item.status.toLowerCase().includes(status.toLowerCase()))
                setFilteredData(filteredResults);
            })
            .catch(error => {
                console.log(error)
                setFilteredData([])
            }),
        await api.get('/mesas')
            .then(resp => {
                let mesa = resp.data.map((item) => {
                    return {key: item.id, value: item.descricao}
                })
                setSelectMesa(mesa)
            })
            .catch(erro => {
                console.log(erro)
            }),
        await api.get('/produtos')
            .then(resp =>{
                let produtosList = resp.data.map((item) => {
                    return {key: item.id, value: item.descricao}
                })
                setSelectedProdutos(produtosList)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        api.get('/pedidos')
            .then(response => {
                setDados(response.data)
            })
            .catch(error => {
                console.log(error)
            }),
            api.get('/mesas')
                .then(resp => {
                    let mesa = resp.data.map((item) => {
                        return {key: item.id, value: item.descricao}
                    })
                    setSelectMesa(mesa)
                })
                .catch(erro => {
                    console.log(erro)
                }),
            api.get('/produtos')
                .then(resp =>{
                    let produtosList = resp.data.map((item) => {
                        return {key: item.id, value: item.descricao, manufaturado: item.manufaturado}
                    })
                    setSelectedProdutos(produtosList)
                })
                .catch(error => {
                    console.log(error)
                })
    }, [dados]);

    return (
        <Container>
            <CCabecalhoHome title="Pedidos" />
            <Body>
                    <CSelectList
                        setSelected={(val) => setSearchStatus(val)}
                        data={selectStatus}
                        save="key"
                        onSelect={() => {
                            handleSearch({ status: searchStatus })
                        }}
                        searchPlaceholder="Pesquisar Status Pedido..."
                        placeholder='Pesquisar Status Pedido...'
                        defaultOption={{key: 'Aberto', value: 'Aberto'}}
                    />

                    {modalVisibleEdit == true
                        ?
                        // MODAL DE EDIÇÃO
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisibleEdit}
                            onRequestClose={() => {
                                 setModalVisibleEdit(false);
                                 setEditPedidoId(null);
                                 setDispNomeCLiente(null)
                                 setDispStatus(null)
                                 setDispProdutos(null)
                                 setSelected("")
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                         setModalVisibleEdit(false);
                                         setEditPedidoId(null);
                                         setDispNomeCLiente(null)
                                         setDispStatus(null)
                                         setDispProdutos(null)
                                         setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <TextCad>{dispNomeCLiente}</TextCad>
                                    <Input
                                        placeholder="Nome"
                                        autoCapitalize='none'
                                        onChangeText={setEditUsuario}
                                        value={editUsuario}
                                    />
                                    <TextCad>{dispStatus}</TextCad>
                                    <CSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={editStatus}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Cargo"
                                        searchPlaceholder="Pesquisar"
                                        defaultOption={{key: dispStatus, value: dispStatus }}
                                    />

                                    <TextCad>{dispProdutos}</TextCad>
                                    <Input
                                        placeholder="Login"
                                        autoCapitalize='none'
                                        onChangeText={setEditLogin}
                                        value={editLogin}
                                    />
                                    <TextCad>Senha</TextCad>
                                    <Input
                                        placeholder="Senha"
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        onChangeText={setEditSenha}
                                        value={editSenha}
                                    />
                                    <CColumn />
                                    <Coluna>
                                        <CIconButton iconName="trash" color="red" size={50} onPress={() => handleDeletePedido({ id: editPedidoId})}/>

                                        <CIconButton iconName='save' color='black' size={50} onPress={() => handleEditPedido({
                                            id: editPedidoId,
                                            nomecliente: editUsuario,
                                            status: selected
                                        })} />
                                    </Coluna>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        // FIM MODAL EDIÇÃO
                        :
                        <></>
                    }

                {Array.isArray(filteredData) && filteredData.length > 0
                    ? filteredData.map((item, index) => (
                        <LinhaContainer key={index}>
                            <Coluna>
                                <Text></Text>
                                <CIconButton iconName="edit" color="blue" size={50} onPress={() => {
                                     setEditPedidoId(item.id)
                                     setDispNomeCLiente(item.nomecliente)
                                     setDispStatus(item.status)
                                    setModalVisibleEdit(true)
                                }} />
                            </Coluna>

                            <Text>Mesa: {selectMesa.find(mesa => mesa.key === item.mesa.id)?.value}</Text>
                            <Text>Pedido: {item.nomecliente}</Text>
                            <Text style={{ textAlign: 'center', color: 'red' }}>{item.status}</Text>

                        </LinhaContainer>
                    ))
                    : Array.isArray(dados) && dados.map((item, index) => (
                        <LinhaContainer key={index}>
                            <Coluna>
                                <Text></Text>
                                <CIconButton iconName="edit" color="blue" size={50} onPress={() => {
                                     setEditPedidoId(item.id)
                                     setDispNomeCLiente(item.nomecliente)
                                     setDispStatus(item.status)
                                    setModalVisibleEdit(true)
                                }} />
                            </Coluna>

                            <Text>Mesa: {selectMesa.find(mesa => mesa.key === item.mesa.id)?.value}</Text>
                            <Text>Pedido: {item.nomecliente}</Text>
                            <Text style={{ textAlign: 'center', color: 'red' }}>{item.status}</Text>

                        </LinhaContainer>
                ))}
            </Body>
            <Footer>
                <CIconButton iconName='plus' color='green' size={60} onPress={() => setModalVisibleNew(true)} style={{ height: 80 }}/>


                {
                    modalVisibleNew == true
                        ?
                        // MODAL NOVO
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisibleNew}
                            onRequestClose={() => {
                                setModalVisibleNew(false);
                                setNovoNomeCLiente(null)
                                setNovoStatus(null)
                                setListProducts([])
                                setQuantidade(null)
                                setSelectProduto([])
                                setItensGrid([])
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovoNomeCLiente(null)
                                        setNovoStatus(null)
                                        setListProducts([])
                                        setQuantidade(null)
                                        setSelectProduto([])
                                        setItensGrid([])
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text style={{ color: 'white' }}>Cadastrar Pedido</Text>
                                    <TextCad>Nome Cliente</TextCad>
                                    <Input
                                        placeholder="Nome cliente"
                                        onChangeText={setNovoNomeCLiente}
                                        value={novoNomeCLiente}
                                    />
                                    <TextCad>*Mesa</TextCad>
                                    <CSelectList
                                        setSelected={(val) => setSelectedMesa(val)}
                                        data={selectMesa}
                                        save="key"
                                        onSelect={() => selectedMesa}
                                        label="Mesa"
                                        searchPlaceholder="Pesquisar"
                                        placeholder='Selecione uma mesa...'
                                    />
                                    <Body style={{ marginTop: 20 }}>
                                        <LinhaProduto>
                                            <Coluna>
                                                <TextCad>*Produto</TextCad>
                                            </Coluna>
                                            <Coluna>
                                                <CSelectList
                                                    setSelected={(val) => setSelectProduto(val)}
                                                    data={selectedProdutos}
                                                    save="value"
                                                    onSelect={() => selectProduto}
                                                    label="Produto"
                                                    searchPlaceholder="Pesquisar"
                                                    placeholder='Selecione um produto...'
                                                />
                                            </Coluna>
                                            <TextCad>*Qtd.</TextCad>
                                            <Coluna>
                                                <InputSearch
                                                    keyboardType='numeric'
                                                    onChangeText={setQuantidade}
                                                    value={quantidade}
                                                />
                                                <CIconButton iconName='plus' color='blue' size={40} onPress={handleAddPRoduto} />
                                            </Coluna>
                                            {/*<FlatList*/}
                                            {/*    data={itensGrid}*/}
                                            {/*    keyExtractor={(item, index) => index.toString()}*/}
                                            {/*    numColumns={2}*/}
                                            {/*    renderItem={({ item }) => {*/}
                                            {/*        return (*/}
                                            {/*            <TextGrid key={item.produto}>*/}
                                            {/*                <TextGrid>{`Produto: ${item.produto}`}</TextGrid>*/}
                                            {/*                <TextGrid>  </TextGrid>*/}
                                            {/*                <TextGrid>{`Qtd.: ${item.quantidade}`}</TextGrid>*/}
                                            {/*            </TextGrid>*/}
                                            {/*        )*/}
                                            {/*    }}*/}
                                            {/*/>*/}
                                            {itensGrid.map((item, index) => (
                                                <TextGrid key={index}>
                                                    <TextGrid>{`Produto: ${item.produto}`}</TextGrid>
                                                    <TextGrid>  </TextGrid>
                                                    <TextGrid>{`Qtd: ${item.quantidade}`}</TextGrid>
                                                </TextGrid>
                                            ))}
                                        </LinhaProduto>
                                    </Body>
                                    <CColumn />

                                    <Coluna>
                                        <Text></Text>
                                        <CIconButton iconName='save' color='black' size={40} onPress={() => handleNewPedido({
                                            nomeCliente: novoNomeCLiente,
                                            mesa: selectedMesa,
                                            pedidosProdutos: listProducts
                                        })} />
                                    </Coluna>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        // FIM MODAL NOVO
                        :
                        <></>
                }
            </Footer>
        </Container>
    )
}