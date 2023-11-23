import React, {useEffect, useState} from "react";
import {Body, Container, Footer, HeaderModal, Input, TextCad, Text, Coluna, ColunaCheck, InputSearch} from "./styles";
import api from "../../utils/api";
import {Modal, Alert} from 'react-native';
import {CIconButton} from "../../components/CIconButton";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {CTable} from "../../components/CTable";
import {CTableRow} from "../../components/CTableRow";
import {Checkbox} from "expo-checkbox";
import {CMultSelectList} from "../../components/CMultSelectList";

interface IProdutos{
    id?: number
    manufaturado?: boolean
    descricao?: string
    valorunitario?: number
    empresa?: any[]
}


export function SProdutos() {
    const [ dados, setDados ] = useState([])
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [ selected, setSelected ] = useState("")
    const [ selectEmpresa, setSelectEmpresa ] = useState([])
    const [ searchProduto , setSearchProduto ] = useState(null)
    const [ filteredData , setFilteredData ] = useState([]);

    // VARIAVEIS PARA CRIAÇÃO
    const [ novoManufaturado, setNovoManufaturado ] = useState(false)
    const [ novaDescricao, setNovaDescricao ] = useState(null)
    const [ novoValorUnitario, setNovoValorUnitario ] = useState(null)


    // VARIAVEIS PARA EDIÇÃO
    const [ editProdutoId, setEditProdutoId] = useState(null)
    const [ editManufaturado, setEditManufaturado] = useState(null)
    const [ editDescricao, setEditDescricao ] = useState(null)
    const [ editValorUnitario, setEditValorUnitario ] = useState(null)


    // VARIAVEIS ṔARA EXIBIR
    const [ dispValorUnitario, setDispValorUnitario ] = useState(null)
    const [ dispDescricao, setDispDescricao ] = useState(null)

    async function handleDeleteProduto({ id, empresa }: IProdutos){
        if (id !== null && (Array.isArray(empresa) && empresa.length !== 0)) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Não'}, {text: 'Sim', onPress: async () => {
                    for (var i in empresa) {
                        await api.delete('produtos/empresa/' + empresa[i] + '/produto/' + id)
                            .catch(error => {
                                console.error(error)
                            })
                    }
                    await api.delete('/produtos/' + id).then(resp =>{
                        setModalVisibleEdit(false)
                        setEditProdutoId(null)
                        setSelected("")
                        setFilteredData([])
                    })
                }}])
        } else {
            Alert.alert('Error', 'Informe pelo menos uma(1) empresa para poder deletar', [{ text: 'OK' }])
            setModalVisibleEdit(true)
        }
    }

    async function handleNewProduto({ manufaturado, descricao, valorunitario, empresa }: IProdutos){
        if (manufaturado !== null && descricao !== null && valorunitario !== null && (Array.isArray(empresa) && empresa.length !== 0)){
            await api.post('/produtos', {
                manufaturado,
                descricao,
                valorunitario,
                empresa
            })
                .then(response => {
                    Alert.alert('Cadastro realizado com sucesso', '', [{text: 'OK'}])
                    setModalVisibleNew(false);
                    setNovaDescricao(null)
                    setNovoManufaturado(false)
                    setNovoValorUnitario(null)
                    setSelected("")
                    setFilteredData([])
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            Alert.alert('Campos obrigatórios(*) não preenchidos ')
            setModalVisibleNew(true)
        }
    }

    async function handleEditProduto({ id, manufaturado, descricao, valorunitario, empresa}: IProdutos){
        if (id !== null){
            await api.patch('/produtos/'+id, {
                manufaturado,
                descricao,
                valorunitario,
                empresa
            })
                .then(response => {
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                    setModalVisibleEdit(false);
                    setEditDescricao(null)
                    setEditProdutoId(null)
                    setEditManufaturado(false)
                    setEditValorUnitario(null)
                    setSelected("")
                    setFilteredData([])
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    async function handleSearch({ descricao }: IProdutos) {
        await api.get('/produtos')
            .then(response => {
                const filteredResults = response.data.filter(item => item.descricao.toLowerCase().includes(descricao.toLowerCase()));
                setFilteredData(filteredResults);
            })
            .catch(error => {
                console.log(error)
            }),
        await api.get('/empresas')
            .then(resp => {
                let empresa = resp.data.map((item) => {
                    return {key: item.id, value: item.nome}
                })
                setSelectEmpresa(empresa)
            })
            .catch(erro => {
                console.log(erro)
            })

    }

    useEffect(() => {
            api.get('/empresas')
                .then(resp => {
                    let empresa = resp.data.map((item) => {
                        return {key: item.id, value: item.nome}
                    })
                     setSelectEmpresa(empresa)
                })
                .catch(erro => {
                    console.log(erro)
                }),
                api.get('/produtos')
                    .then(response => {
                        setDados(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })},
        [dados]);
    return (
        <Container>
            <CCabecalhoHome title="Produtos" />

            <Coluna>
                <InputSearch
                    placeholder="Pesquisar Produto..."
                    placeholderTextColor='white'
                    onChangeText={(text) => {
                        setSearchProduto(text);
                        handleSearch({ descricao: text });
                    }}
                    value={searchProduto}
                />
                <CIconButton iconName='search' color='white' size={30} onPress={() => handleSearch({
                    id: searchEmpresa })} />
            </Coluna>

            <Body>
                <CTable>

                    {/*MODAL DE EDIÇÃO*/}
                    {modalVisibleEdit == true
                        ?
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisibleEdit}
                            onRequestClose={() => {
                                setModalVisibleEdit(false);
                                setDispDescricao(null)
                                setDispValorUnitario(null)
                                setEditProdutoId(null)
                                setEditDescricao(null)
                                setEditManufaturado(false)
                                setEditValorUnitario(null)
                                setSelected("")
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleEdit(false);
                                        setDispDescricao(null)
                                        setDispValorUnitario(null)
                                        setEditProdutoId(null)
                                        setEditDescricao(null)
                                        setEditManufaturado(false)
                                        setEditValorUnitario(null)
                                        setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <TextCad>{dispDescricao}</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        autoCapitalize='none'
                                        onChangeText={setEditDescricao}
                                        value={editDescricao}
                                    />
                                    <TextCad>{dispValorUnitario}</TextCad>
                                    <Input
                                        placeholder="Valor Unitário"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={setEditValorUnitario}
                                        value={editValorUnitario.valueOf()}
                                    />

                                    <ColunaCheck>
                                        <Checkbox
                                            style={{ margin: 15 }}
                                            onValueChange={setEditManufaturado}
                                            value={editManufaturado}
                                            color={'#fff'}
                                        />
                                        <TextCad>Manufaturado</TextCad>
                                    </ColunaCheck>

                                    <TextCad>Empresa</TextCad>
                                    <CMultSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={selectEmpresa}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Empresa(s)"
                                        searchPlaceholder="Pesquisar"
                                    />

                                    <CColumn />

                                    <Coluna>
                                        <CIconButton iconName="trash" color="red" size={50} onPress={() => handleDeleteProduto({ id: editProdutoId, empresa: selected.valueOf() })}/>

                                        <CIconButton iconName='save' color='black' size={50} onPress={() => handleEditProduto({
                                            id: editProdutoId,
                                            manufaturado: editManufaturado,
                                            descricao: editDescricao,
                                            valorunitario: editValorUnitario ? editValorUnitario.replace(/,/g, '.') : null,
                                            empresa: selected.valueOf()
                                        })} />
                                    </Coluna>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        :
                        <></>
                    }
                    {/*FIM MODAL EDIÇÃO*/}


                    <CTableRow backgroundColor='green' data={["Descrição","Vlr Uni","Manuf",""]} textStyle={[{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }]}/>

                    {Array.isArray(filteredData) && filteredData.length > 0
                        ? filteredData.map((item, index) => (
                            <CTableRow backgroundColor='white' key={index} textStyle={[{color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center'}]}
                                       data={[item.descricao, item.valorunitario,

                                           <Checkbox
                                               disabled
                                               value={item.manufaturado}
                                               style={{ alignSelf: 'center' }}
                                           />,

                                           <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                               setModalVisibleEdit(true)
                                               setDispDescricao(item.descricao)
                                               setDispValorUnitario(item.valorunitario)
                                               setEditProdutoId(item.id)
                                               setEditManufaturado(item.manufaturado)
                                               setEditValorUnitario(item.valorunitario)
                                               setEditDescricao(item.descricao)
                                           }} />

                                       ]}
                            />
                        ))
                        : Array.isArray(dados) && dados.map((item, index) => (
                            <CTableRow backgroundColor='white' key={index} textStyle={[{color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center'}]}
                                       data={[item.descricao, item.valorunitario,

                                           <Checkbox
                                               disabled
                                               value={item.manufaturado}
                                               style={{ alignSelf: 'center' }}
                                           />,

                                           <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                               setModalVisibleEdit(true)
                                               setDispDescricao(item.descricao)
                                               setDispValorUnitario(item.valorunitario)
                                               setEditProdutoId(item.id)
                                               setEditManufaturado(item.manufaturado)
                                               setEditValorUnitario(item.valorunitario)
                                               setEditDescricao(item.descricao)
                                           }} />

                                       ]}
                            />
                    ))}
                </CTable>
            </Body>
            <CColumn />

            <Footer>
                <CIconButton iconName='plus' color='green' size={60} onPress={() => setModalVisibleNew(true)} style={{ height: 80 }}/>

                {/*MODAL NOVO*/}
                {
                    modalVisibleNew == true
                        ?
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisibleNew}
                            onRequestClose={() => {
                                setModalVisibleNew(false)
                                setNovaDescricao(null)
                                setNovoManufaturado(false)
                                setNovoValorUnitario(null)
                                setSelected("")
                            }}>

                            <CColumn align='center'>

                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovaDescricao(null)
                                        setNovoManufaturado(false)
                                        setNovoValorUnitario(null)
                                        setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar Produto</Text>
                                    <TextCad>*Descrição</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        onChangeText={setNovaDescricao}
                                        value={novaDescricao}
                                    />
                                    <TextCad>*Valor Unitário</TextCad>
                                    <Input
                                        placeholder="Valor Unitário"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={setNovoValorUnitario}
                                        value={novoValorUnitario}
                                    />

                                    <ColunaCheck>
                                        <Checkbox
                                            style={{ margin: 15 }}
                                            onValueChange={setNovoManufaturado}
                                            value={novoManufaturado}
                                            color={'#FFF'}
                                        />
                                        <TextCad>*Manufaturado</TextCad>
                                    </ColunaCheck>

                                    <TextCad>*Empresa</TextCad>
                                    <CMultSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={selectEmpresa}
                                        placeholder='*Select option'
                                        save="key"
                                        onSelect={() => selected}
                                        label="Empresa(s)"
                                        searchPlaceholder="Selecione uma"
                                    />

                                    <CColumn />

                                    <Coluna>
                                        <Text></Text>
                                        <CIconButton  iconName='save' color='black' size={40} onPress={() => handleNewProduto({
                                            manufaturado: novoManufaturado,
                                            descricao: novaDescricao,
                                            valorunitario: novoValorUnitario ? novoValorUnitario.replace(/,/g, '.') : null,
                                            empresa: selected.valueOf()
                                        })} />
                                    </Coluna>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        :
                        <></>
                }
                {/*FIM MODAL NOVO*/}
            </Footer>
        </Container>
    )
}