import React from "react";
import { CCabecalhoHome} from "../../components/CCabecalhoHome";
import {Container, Footer, HeaderModal, Input, Text} from "./styles";
import {CColumn} from "../../components/CColumn";
import {CRow} from "../../components/CRow";
import {CIconButton} from "../../components/CIconButton";
import api from "../../utils/api";
import {useEffect, useState} from "react";
import { Modal, Alert, FlatList } from "react-native";
import {CButton} from "../../components/CButton";

export function SEmpresa() {
    const [ empresas, setEmpresas ] = useState([])
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [ editEmpresa, setEditEmpresa] = useState()
    const [ editEmpresaId, setEditEmpresaId] = useState(null)
    const [ nomeEmpresa, setNomeEmpresa] = useState()
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ novaEmpresa, setNovaEmpresa ] = useState()

    function handleDeleteEmpresa(id: number | null) {
        if (id !== null) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Cancelar'}, {text: 'OK', onPress: () => {
                api.delete('/empresas/' + id)
                setEditEmpresaId(null);
                setNomeEmpresa(null);
                setEditEmpresa(null)
                }}])
        }
    }

    function handleEditEmpresa(id: number | null){
        if (id !== null) {
            api.patch('/empresas/' +id, {
                nome: editEmpresa,
            })
                .then(response => {
                    //console.log('OK')
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                })
                .catch(error => {
                    console.log(error)
                });
        }
        setEditEmpresaId(null);
        setNomeEmpresa(null);
        setEditEmpresa(null)
        setModalVisibleEdit(false)
    }

    function handleNewEmpresa(nome: string | null){
        if (nome !== null){
            api.post('/empresas', {
                nome: novaEmpresa
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
        setNovaEmpresa(null)
    }

    useEffect(() => {
        api.get('/empresas')
            .then(response=>{
                setEmpresas(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [empresas]);

    return (
        <Container>
            <CCabecalhoHome title='Empresa' />

            <CColumn marginLeft={20} marginTop={50}>

                <FlatList
                    data={empresas}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 26 }}
                    renderItem={({item }) => {
                        return (
                            <>
                                {
                                    item.id == 1
                                    ?
                                        <CRow key={item.id}>
                                            <Text>{item.nome}

                                                <CIconButton iconName="edit" color="blue" size={60} onPress={() => {
                                                    setEditEmpresaId(item.id)
                                                    setNomeEmpresa(item.nome)
                                                    setModalVisibleEdit(true)
                                                    setEditEmpresa(null)
                                                }} />

                                                <CIconButton iconName="trash" color="red" size={60} onPress={() => handleDeleteEmpresa(item.id)} />

                                            </Text>

                                            {
                                                modalVisibleEdit == true
                                                    ?
                                                    // MODAL DE EDIÇÃO
                                                    <Modal
                                                        animationType="none"
                                                        transparent={true}
                                                        visible={modalVisibleEdit}
                                                        onRequestClose={() => {
                                                            setModalVisibleEdit(false);
                                                            setEditEmpresaId(null);
                                                            setNomeEmpresa(null)
                                                            setEditEmpresa(null)
                                                        }}>
                                                        <CColumn>
                                                            <HeaderModal>
                                                                <Text>*{nomeEmpresa}</Text>
                                                                <Input
                                                                    placeholder="Nome"
                                                                    autoCapitalize='none'
                                                                    onChangeText={setEditEmpresa}
                                                                    value={editEmpresa}
                                                                />
                                                                <CButton title="Cancelar" onPress={() => {
                                                                    setModalVisibleEdit(false)
                                                                    setEditEmpresaId(null)
                                                                    setNomeEmpresa(null)
                                                                    setEditEmpresa(null)
                                                                }} />
                                                                <CButton title="Salvar" onPress={() => handleEditEmpresa(editEmpresaId)} />
                                                            </HeaderModal>
                                                        </CColumn>
                                                    </Modal>
                                                    // FIM MODAL EDIÇÃO
                                                    :
                                                    <></>
                                            }

                                        </CRow>
                                    :
                                        <CRow key={item.id}>
                                            <Text>{item.nome}

                                                <CIconButton marginLeft={10} iconName="edit" color="blue" size={60} onPress={() => {
                                                    setEditEmpresaId(item.id)
                                                    setNomeEmpresa(item.nome)
                                                    setModalVisibleEdit(true)
                                                    setEditEmpresa(null)
                                                }} />

                                                <CIconButton iconName="trash" color="red" size={60} onPress={() => handleDeleteEmpresa(item.id)} marginLeft={10} />

                                            </Text>

                                            {
                                                modalVisibleEdit == true
                                                    ?
                                                    // MODAL DE EDIÇÃO
                                                    <Modal
                                                        animationType="none"
                                                        transparent={true}
                                                        visible={modalVisibleEdit}
                                                        onRequestClose={() => {
                                                            setModalVisibleEdit(false);
                                                            setEditEmpresaId(null);
                                                            setNomeEmpresa(null)
                                                            setEditEmpresa(null)
                                                        }}>
                                                        <CColumn>
                                                            <HeaderModal>
                                                                <Text>*{nomeEmpresa}</Text>
                                                                <Input
                                                                    placeholder="Nome"
                                                                    autoCapitalize='none'
                                                                    onChangeText={setEditEmpresa}
                                                                    value={editEmpresa}
                                                                />
                                                                <CButton title="Cancelar" onPress={() => {
                                                                    setModalVisibleEdit(false)
                                                                    setEditEmpresaId(null)
                                                                    setNomeEmpresa(null)
                                                                    setEditEmpresa(null)
                                                                }} />
                                                                <CButton title="Salvar" onPress={() => handleEditEmpresa(editEmpresaId)} />
                                                            </HeaderModal>
                                                        </CColumn>
                                                    </Modal>
                                                    // FIM MODAL EDIÇÃO
                                                    :
                                                    <></>
                                            }

                                        </CRow>
                                }
                            </>
                        )
                    }}
                />

            </CColumn>
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
                                setNovaEmpresa(null)
                            }}>
                            <CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar nova Empresa</Text>
                                    <Input
                                        placeholder="Nome"
                                        autoCapitalize='none'
                                        onChangeText={setNovaEmpresa}
                                        value={novaEmpresa}
                                    />
                                    <CButton title="Cancelar" onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovaEmpresa(null)
                                    }} />
                                    <CButton title="Salvar" onPress={() => {handleNewEmpresa(novaEmpresa)}} />
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