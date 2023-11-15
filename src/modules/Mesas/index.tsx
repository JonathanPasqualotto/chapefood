import React, {useEffect, useState} from "react";
import {Body, Container, Footer, HeaderModal, Input, TextCad, Text} from "./styles";
import api from "../../utils/api";
import { Table, TableWrapper, Row, Cell, Rows } from 'react-native-table-component';
import {StyleSheet, View, Modal, Alert} from 'react-native';
import {CButton} from "../../components/CButton";
import {CIconButton} from "../../components/CIconButton";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {CRow} from "../../components/CRow";
import {CTable} from "../../components/CTable";

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

    // VARIAVEIS PARA CRIAÇÃO
    const [ novaCapacidade, setNovaCapacidade ] = useState(null)
    const [ novaDescricao, setNovaDescricao ] = useState(null)
    const [ novaEmpresa, setNovaEmpresa ] = useState(null)

    // VARIAVEIS PARA EDIÇÃO
    const [ editMesaId, setEditMesaId] = useState(null)
    const [ editCapacidade, setEditCapacidade] = useState(null)
    const [ editDescricao, setEditDescricao ] = useState(null)
    const [ editEmpresa, setEditEmpresa ] = useState(null)

    // VARIAVEIS ṔARA EXIBIR
    const [ dispCapacidade, setDispCapacidade ] = useState(null)
    const [ dispDescricao, setDispDescricao ] = useState(null)
    const [ dispEmpresa, setDispEmpresa ] = useState(null)

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 20, paddingTop: 50 },
        head: { backgroundColor: 'green', marginTop: 20, height: 40 },
        text: { margin: 6, backgroundColor: 'white' }
    });

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
    }

    async function handleEditMesa({ id, capacidade, descricao, empresa }: IMesa){
        console.log(id)
        if (id !== null){
            await api.patch('/mesas/'+id, {
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
        setModalVisibleEdit(false);
        setNovaDescricao(null)
        setNovaCapacidade(null)
        setNovaEmpresa(null)
    }


    useEffect(() => {
        api.get('/mesas')
            .then(response=>{
                setDados(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [dados]);
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
                                    <Input
                                        placeholder="Empresa"
                                        autoCapitalize='none'
                                        onChangeText={setEditEmpresa}
                                        value={editEmpresa}
                                    />

                                    <CColumn />

                                    <CIconButton marginLeft={200} iconName='save' color='black' size={50} onPress={() => handleEditMesa({
                                        id: editMesaId,
                                        descricao: editDescricao,
                                        capacidade: editCapacidade,
                                        empresa: editEmpresa
                                    })} />
                                    <CIconButton marginLeft={280} iconName="trash" color="red" size={50} onPress={() => handleDeleteMesa({ id: editMesaId})}/>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        :
                        <></>
                    }
                     {/*FIM MODAL EDIÇÃO*/}


                    <Row data={["Descrição","Capacidade","Empresa","Editar"]} style={styles.head}/>

                    {Array.isArray(dados) && dados.map((item, index) => (
                        <Row style={styles.text} key={index}
                             data={[item.descricao, item.capacidade, item.empresa.nome,

                                 <CIconButton iconName="edit" color="blue" size={30} onPress={() => {
                                     setEditMesaId(item.id)
                                     setDispDescricao(item.descricao)
                                     setDispCapacidade(item.capacidade)
                                     setDispEmpresa(item.empresa.nome)
                                     setEditDescricao(item.descricao)
                                     setEditCapacidade(item.capacidade.toString())
                                     setEditEmpresa(item.empresa.id)
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


                {
                    modalVisibleNew == true
                        ?
                        // MODAL NOVO
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisibleNew}
                            onRequestClose={() => {
                                setModalVisibleNew(false)
                                setNovaDescricao(null)
                                setNovaCapacidade(null)
                                setNovaEmpresa(null)
                            }}>

                            <CColumn align='center'>

                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovaDescricao(null)
                                        setNovaCapacidade(null)
                                        setNovaEmpresa(null)
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar nova Mesa</Text>
                                    <TextCad>Descrição</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        autoCapitalize='none'
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
                                    <Input
                                        placeholder="Empresa"
                                        autoCapitalize='none'
                                        onChangeText={setNovaEmpresa}
                                        value={novaEmpresa}
                                    />

                                    <CColumn />

                                    <CIconButton marginLeft={280} iconName='save' color='black' size={40} onPress={() => handleNewMesa({
                                        descricao: novaDescricao,
                                        capacidade: novaCapacidade,
                                        empresa: novaEmpresa
                                    })} />
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