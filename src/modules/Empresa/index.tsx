import React from "react";
import { CCabecalhoHome} from "../../components/CCabecalhoHome";
import {Coluna, Container, Footer, HeaderModal, Input, InputSearch, Text, TextCad} from "./styles";
import {CColumn} from "../../components/CColumn";
import {CIconButton} from "../../components/CIconButton";
import api from "../../utils/api";
import {useEffect, useState} from "react";
import { Modal, Alert } from "react-native";
import {CTable} from "../../components/CTable";
import {CTableRow} from "../../components/CTableRow";
import { IEmpresa } from "./interfaces/IEmpresa";

export function SEmpresa() {
    const [ dados, setDados ] = useState<Array<IEmpresa>>([])
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false)
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ searchEmpresa, setSearchEmpresa ] = useState('')
    const [ filteredData, setFilteredData ] = useState<Array<IEmpresa>>([]);

    // VARIAVEIS DE EDITÇÃO
    const [ editEmpresa, setEditEmpresa] = useState('')
    const [ editEmpresaId, setEditEmpresaId] = useState<number | undefined>(0)

    // VARIAVEIS PARA EXIBIR
    const [ dispEmpresa, setDispEmpresa] = useState<string | undefined>('')

    // VARIAVEIS PARA CRIAÇÃO
    const [ novaEmpresa, setNovaEmpresa ] = useState('')

    function handleDeleteEmpresa({ id }: IEmpresa) {
        if (id !== null) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Não'}, {text: 'Sim', onPress: async () => {
                await api.delete('/empresas/' + id)
                    .then(resp =>{
                        setEditEmpresaId(undefined)
                        setModalVisibleEdit(false)
                        setSearchEmpresa('');
                        setFilteredData([])
                    })
                }}])
        }
    }

    async function handleEditEmpresa({ id, nome }: IEmpresa){
        if (id !== null) {
            await api.patch('/empresas/' +id, {
                nome
            })
                .then(response => {
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                    setEditEmpresaId(undefined)
                    setEditEmpresa('')
                    setModalVisibleEdit(false)
                    setSearchEmpresa('');
                    setFilteredData([])
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    async function handleNewEmpresa({ nome }: IEmpresa){
        if (nome !== null){
            await api.post('/empresas', {
                nome
            })
                .then(response => {
                    Alert.alert('Cadastro realizado com sucesso', '', [{text: 'OK'}])
                    setModalVisibleNew(false);
                    setNovaEmpresa('')
                    setSearchEmpresa('');
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

    async function handleSearch({ nome }: IEmpresa) {
        await api.get('/empresas')
            .then(response => {
                const data: IEmpresa[] = response.data
                const filteredResults = data.filter(item=> item.nome!.toLowerCase().includes(nome!.toLowerCase()));
                setFilteredData(filteredResults);
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        api.get('/empresas')
            .then(response=>{
                setDados(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [dados]);

    return (
        <Container>
            <CCabecalhoHome title='Empresas' />
            <Coluna>
                <InputSearch
                    placeholder="Pesquisar Empresa..."
                    placeholderTextColor='white'
                    onChangeText={(text) => {
                        setSearchEmpresa(text);
                        handleSearch({ nome: text });
                    }}
                    value={searchEmpresa}
                />
            </Coluna>
            <CTable>
                {
                    modalVisibleEdit == true
                        ?
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisibleEdit}
                            onRequestClose={() => {
                                setModalVisibleEdit(false);
                                setEditEmpresaId(0);
                                setDispEmpresa('')
                                setEditEmpresa('')
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleEdit(false)
                                        setEditEmpresaId(undefined)
                                        setDispEmpresa('')
                                        setEditEmpresa('')
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>{dispEmpresa}</Text>
                                    <Input
                                        placeholder="Nome"
                                        autoCapitalize='none'
                                        onChangeText={(text:string) => setEditEmpresa(text)}
                                        value={editEmpresa}
                                    />
                                    <Coluna>
                                        <CIconButton iconName="trash" color="red" size={40} onPress={() => handleDeleteEmpresa({ id: editEmpresaId ? editEmpresaId : undefined })} />

                                        <CIconButton iconName='save' color='black' size={40} onPress={() => handleEditEmpresa({
                                            id: editEmpresaId ? editEmpresaId : undefined,
                                            nome: editEmpresa ? editEmpresa : undefined})} />
                                    </Coluna>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        :
                        <></>
                }

                <CTableRow backgroundColor='green' data={["Nome",""]} textStyle={[{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }]} />
                    {Array.isArray(filteredData) && filteredData.length > 0
                        ? filteredData.map((item, index) => (
                            <CTableRow backgroundColor='white' key={index} textStyle={[{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }]}
                                       data={[item.nome,

                                           <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                               setEditEmpresaId(item.id)
                                               setDispEmpresa(item.nome)
                                               setModalVisibleEdit(true)
                                               setEditEmpresa('')
                                           }} />

                                       ]}
                            />
                        ))
                        : Array.isArray(dados) && dados.map((item, index) => (
                            <CTableRow backgroundColor='white' key={index} textStyle={[{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }]}
                               data={[item.nome,
                                   <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                       setEditEmpresaId(item.id)
                                       setDispEmpresa(item.nome)
                                       setModalVisibleEdit(true)
                                       setEditEmpresa('')
                                   }} />

                               ]}
                            />
                    ))}
            </CTable>
            <CColumn />
            <Footer>
                <CIconButton iconName='plus' color='green' size={40} onPress={() => setModalVisibleNew(true)} style={{ height: 80 }}/>
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
                                setNovaEmpresa('')
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false);
                                        setNovaEmpresa('')
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar Empresa</Text>
                                    <TextCad>* Nome</TextCad>
                                    <Input
                                        placeholder="Nome"
                                        autoCapitalize='none'
                                        onChangeText={setNovaEmpresa}
                                        value={novaEmpresa}
                                    />
                                    <Coluna>
                                        <Text></Text>
                                        <CIconButton iconName='save' color='black' size={40} onPress={() => {handleNewEmpresa({ nome: novaEmpresa})}} />
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