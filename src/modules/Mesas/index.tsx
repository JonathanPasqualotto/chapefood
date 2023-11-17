import React, {useEffect, useState} from "react";
import {Body, Container, Footer, HeaderModal, Input, TextCad, Text, Coluna} from "./styles";
import api from "../../utils/api";
import { Row } from 'react-native-table-component';
import {StyleSheet, Modal, Alert} from 'react-native';
import {CIconButton} from "../../components/CIconButton";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {CTable} from "../../components/CTable";
import { SelectList } from "react-native-dropdown-select-list/index";
import {CSelectList} from "../../components/CSelectList";
import {CTableRow} from "../../components/CTableRow";

interface IMesa{
    id?: number
    capacidade?: number
    descricao?: string
    empresa?: number
}


export function SMesas() {
    const [ dados, setDados ] = useState([])
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [ selected, setSelected ] = useState("")
    const [ selectEmpresa, setSelectEmpresa ] = useState([])

    // VARIAVEIS PARA CRIAÇÃO
    const [ novaCapacidade, setNovaCapacidade ] = useState(null)
    const [ novaDescricao, setNovaDescricao ] = useState(null)
    const [ novaEmpresa, setNovaEmpresa ] = useState(null)

    // VARIAVEIS PARA EDIÇÃO
    const [ editMesaId, setEditMesaId] = useState(null)
    const [ editCapacidade, setEditCapacidade] = useState(null)
    const [ editDescricao, setEditDescricao ] = useState(null)
    const [ editEmpresa, setEditEmpresa ] = useState(null)
    const [selectedEdit, setSelectedEdit] = useState("");


    // VARIAVEIS ṔARA EXIBIR
    const [ dispCapacidade, setDispCapacidade ] = useState(null)
    const [ dispDescricao, setDispDescricao ] = useState(null)
    const [ dispEmpresa, setDispEmpresa ] = useState(null)

    async function handleDeleteMesa({ id }: IMesa){
        if (id !== null) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Não'}, {text: 'Sim', onPress: async () => {
                    await api.delete('/mesas/' + id)
                }}])
        }
        setModalVisibleEdit(false)
        setEditMesaId(null)
    }

    async function handleNewMesa({ capacidade, descricao, empresa }: IMesa){
        if (descricao !== null){
            await api.post('/mesas', {
                capacidade,
                descricao,
                empresa
            })
                .then(response => {
                    //console.log('OK')
                    Alert.alert('Cadastro realizado com sucesso', '', [{text: 'OK'}])
                })
                .catch(error => {
                    console.log(error)
                })
        }
        setModalVisibleNew(false);
        setNovaDescricao(null)
        setNovaCapacidade(null)
        setNovaEmpresa(null)
        setSelected("")
    }

    async function handleEditMesa({ id, capacidade, descricao, empresa }: IMesa){
        console.log('id ',id)
        console.log('empresa ',empresa)
        if (id !== null){
            await api.patch('/mesas/'+id, {
                capacidade,
                descricao,
                empresa
            })
                .then(response => {
                    //console.log('OK')
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                })
                .catch(error => {
                    console.log(error)
                })
        }
        setModalVisibleEdit(false);
        setNovaDescricao(null)
        setNovaCapacidade(null)
        setNovaEmpresa(null)
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
        api.get('/mesas')
                .then(response => {
                    setDados(response.data)
                })
                .catch(error => {
                    console.log(error)
                })},
        [dados]);
    return (
        <Container>
            <CCabecalhoHome title="Mesas" />
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
                                setEditMesaId(null)
                                setDispDescricao(null)
                                setDispCapacidade(null)
                                setDispEmpresa(null)
                                setEditDescricao(null)
                                setEditCapacidade(null)
                                setEditEmpresa(null)
                                setSelected("")
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleEdit(false);
                                        setEditMesaId(null)
                                        setDispDescricao(null)
                                        setDispCapacidade(null)
                                        setDispEmpresa(null)
                                        setEditDescricao(null)
                                        setEditCapacidade(null)
                                        setEditEmpresa(null)
                                        setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <TextCad>*{dispDescricao}</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        autoCapitalize='none'
                                        onChangeText={setEditDescricao}
                                        value={editDescricao}
                                    />
                                    <TextCad>*{dispCapacidade}</TextCad>
                                    <Input
                                        placeholder="Capacidade"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={setEditCapacidade}
                                        value={editCapacidade.valueOf()}
                                    />
                                    <TextCad>*{dispEmpresa}</TextCad>
                                    <CSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={selectEmpresa}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Empresa(s)"
                                        searchPlaceholder="Pesquisar"
                                    />

                                    <CColumn />

                                    <Coluna>
                                        <CIconButton iconName='save' color='black' size={50} onPress={() => handleEditMesa({
                                            id: editMesaId,
                                            descricao: editDescricao,
                                            capacidade: editCapacidade,
                                            empresa: selected
                                        })} />
                                        <CIconButton iconName="trash" color="red" size={50} onPress={() => handleDeleteMesa({ id: editMesaId})}/>
                                    </Coluna>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        :
                        <></>
                    }
                     {/*FIM MODAL EDIÇÃO*/}


                    <CTableRow backgroundColor='green' data={["Descrição","Capacidade","Empresa",""]} textStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}/>

                    {Array.isArray(dados) && dados.map((item, index) => (
                        <CTableRow backgroundColor='white' key={index} textStyle={{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }}
                             data={[item.descricao, item.capacidade, item.empresa.nome,

                                 <CIconButton iconName="edit" color="blue" size={30} onPress={() => {
                                     setEditMesaId(item.id)
                                     setDispDescricao(item.descricao)
                                     setDispCapacidade(item.capacidade)
                                     setDispEmpresa(item.empresa.nome)
                                     setEditDescricao(item.descricao)
                                     setEditCapacidade(item.capacidade.toString())
                                     setSelectedEdit(item.empresa.id.toString())
                                     setModalVisibleEdit(true)
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
                                setNovaCapacidade(null)
                                setNovaEmpresa(null)
                                setSelected("")
                            }}>

                            <CColumn align='center'>

                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovaDescricao(null)
                                        setNovaCapacidade(null)
                                        setNovaEmpresa(null)
                                        setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar nova Mesa</Text>
                                    <TextCad>Descrição</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        onChangeText={setNovaDescricao}
                                        value={novaDescricao}
                                    />
                                    <TextCad>Capacidade</TextCad>
                                    <Input
                                        placeholder="Capacidade"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={setNovaCapacidade}
                                        value={novaCapacidade}
                                    />
                                    <TextCad>Empresa</TextCad>
                                    <CSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={selectEmpresa}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Empresa(s)"
                                        searchPlaceholder="Selecione uma"
                                    />

                                    <CColumn />

                                    <CIconButton marginLeft={280} iconName='save' color='black' size={40} onPress={() => handleNewMesa({
                                        descricao: novaDescricao,
                                        capacidade: novaCapacidade,
                                        empresa: selected
                                    })} />
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