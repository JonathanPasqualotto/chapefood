import React, {useEffect, useState} from "react";
import {Body, Container, Footer, HeaderModal, Input, TextCad, Text, Coluna} from "./styles";
import api from "../../utils/api";
import {Modal, Alert} from 'react-native';
import {CIconButton} from "../../components/CIconButton";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {CTable} from "../../components/CTable";
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

    // VARIAVEIS PARA EDIÇÃO
    const [ editMesaId, setEditMesaId] = useState(null)
    const [ editCapacidade, setEditCapacidade] = useState(null)
    const [ editDescricao, setEditDescricao ] = useState(null)


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
        if (descricao !== null && capacidade !== null && empresa !== null) {
            await api.post('/mesas', {
                capacidade,
                descricao,
                empresa
            })
                .then(response => {
                    Alert.alert('Cadastro realizado com sucesso', '', [{text: 'OK'}])
                    setModalVisibleNew(false);
                    setNovaDescricao(null)
                    setNovaCapacidade(null)
                    setSelected("")
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            Alert.alert('Campos obrigatórios(*) não preenchidos ')
            setModalVisibleNew(true)
        }
    }

    async function handleEditMesa({ id, capacidade, descricao, empresa }: IMesa){
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
        setEditDescricao(null)
        setEditCapacidade(null)
        setEditMesaId(null)
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
                                    <TextCad>{dispCapacidade}</TextCad>
                                    <Input
                                        placeholder="Capacidade"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={setEditCapacidade}
                                        value={editCapacidade.valueOf()}
                                    />
                                    <TextCad>{dispEmpresa}</TextCad>
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
                                        <CIconButton iconName="trash" color="red" size={50} onPress={() => handleDeleteMesa({ id: editMesaId})}/>

                                        <CIconButton iconName='save' color='black' size={50} onPress={() => handleEditMesa({
                                            id: editMesaId,
                                            descricao: editDescricao,
                                            capacidade: editCapacidade,
                                            empresa: selected
                                        })} />
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

                                 <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                     setEditMesaId(item.id)
                                     setDispDescricao(item.descricao)
                                     setDispCapacidade(item.capacidade)
                                     setDispEmpresa(item.empresa.nome)
                                     setEditDescricao(item.descricao)
                                     setEditCapacidade(item.capacidade.toString())
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
                                setSelected("")
                            }}>

                            <CColumn align='center'>

                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovaDescricao(null)
                                        setNovaCapacidade(null)
                                        setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar Mesa</Text>
                                    <TextCad>*Descrição</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        onChangeText={setNovaDescricao}
                                        value={novaDescricao}
                                    />
                                    <TextCad>*Capacidade</TextCad>
                                    <Input
                                        placeholder="Capacidade"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={setNovaCapacidade}
                                        value={novaCapacidade}
                                    />
                                    <TextCad>*Empresa</TextCad>
                                    <CSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={selectEmpresa}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Empresa(s)"
                                        searchPlaceholder="Selecione uma"
                                    />

                                    <CColumn />

                                    <Coluna>
                                        <Text></Text>
                                        <CIconButton iconName='save' color='black' size={40} onPress={() => handleNewMesa({
                                            descricao: novaDescricao,
                                            capacidade: novaCapacidade,
                                            empresa: selected
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