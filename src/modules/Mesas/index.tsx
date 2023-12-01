import React, {useEffect, useState} from "react";
import {Body, Container, Footer, HeaderModal, Input, TextCad, Text, Coluna, InputSearch} from "./styles";
import api from "../../utils/api";
import {Modal, Alert} from 'react-native';
import {CIconButton} from "../../components/CIconButton";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {CTable} from "../../components/CTable";
import {CSelectList} from "../../components/CSelectList";
import {CTableRow} from "../../components/CTableRow";
import { ApiData } from "./interfaces/ApiData";
import { IEmpresa } from "../Empresa/interfaces/IEmpresa";

interface IMesa{
    id?: number
    capacidade?: number
    descricao?: string
    empresa?: number
}


export function SMesas() {
    const [ dados, setDados ] = useState<Array<ApiData>>([])
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [ selected, setSelected ] = useState<string | undefined>("")
    const [ selectEmpresa, setSelectEmpresa ] = useState([])
    const [ searchMesas , setSearchMesas ] = useState<string | undefined>(undefined)
    const [ filteredData, setFilteredData ] = useState<Array<ApiData>>([]);

    // VARIAVEIS PARA CRIAÇÃO
    const [ novaCapacidade, setNovaCapacidade ] = useState<number | undefined>(undefined)
    const [ novaDescricao, setNovaDescricao ] = useState<string | undefined>(undefined)

    // VARIAVEIS PARA EDIÇÃO
    const [ editMesaId, setEditMesaId] = useState<number | undefined>(undefined)
    const [ editCapacidade, setEditCapacidade] = useState<number | undefined>(undefined)
    const [ editDescricao, setEditDescricao ] = useState<string | undefined>(undefined)


    // VARIAVEIS ṔARA EXIBIR
    const [ dispCapacidade, setDispCapacidade ] = useState<number | undefined>(undefined)
    const [ dispDescricao, setDispDescricao ] = useState<string | undefined>(undefined)
    const [ dispEmpresa, setDispEmpresa ] = useState<string | undefined>(undefined)

    async function handleDeleteMesa({ id }: IMesa){
        if (id !== null) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Não'}, {text: 'Sim', onPress: async () => {
                    await api.delete('/mesas/' + id)
                        .then(resp =>{
                            setModalVisibleEdit(false)
                            setEditMesaId(undefined)
                            handleSearch({ id: undefined })
                            setFilteredData([])
                        })
                }}])
        }
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
                    setNovaDescricao(undefined)
                    setNovaCapacidade(undefined)
                    setSelected("")
                    handleSearch({ id: undefined })
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

    async function handleEditMesa({ id, capacidade, descricao, empresa }: IMesa){
        if (id !== null){
            await api.patch('/mesas/'+id, {
                capacidade,
                descricao,
                empresa
            })
                .then(response => {
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                    setModalVisibleEdit(false);
                    setEditDescricao(undefined)
                    setEditCapacidade(undefined)
                    setEditMesaId(undefined)
                    handleSearch({ id: undefined })
                    setFilteredData([])
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    async function handleSearch({ descricao }: IMesa) {

        await api.get('/mesas')
            .then(response => {
                const apiResponse : ApiData[] = response.data;
                const filteredResults = apiResponse.filter((item: ApiData) => item.descricao!.toLowerCase().includes(descricao!.toLowerCase()));
                setFilteredData(filteredResults);
            })
            .catch(error => {
                console.log(error)
            }),
        await api.get('/empresas')
            .then(resp => {
                let empresa = resp.data.map((item:IEmpresa) => {
                    return {key: item.id, value: item.nome}
                })
                setSelectEmpresa(empresa)
            })
            .catch(erro => {
                console.log(erro)
            })
    }
    
    var empresaLogada :any[] = [{'id': '2'}];

    let empresas:string[] = [];

    empresaLogada .map((valor) => {
        empresas.push(valor.id)
    })
    
    useEffect(() => {
        api.get('/empresas')
        .then(resp => {
            let empresa = resp.data.map((item:IEmpresa) => {
                return {key: item.id, value: item.nome}
            })
            setSelectEmpresa(empresa)
        })
        .catch(erro => {
            console.log(erro)
        }),
        
        api.get('/mesas?ids='+empresas)
                .then(response => {
                    setDados(response.data)
                })
                .catch(error => {
                    console.log(error)
                })},[dados]);
    return (
        <Container>
            <CCabecalhoHome title="Mesas" />

            <Coluna>
                <InputSearch
                    placeholder="Pesquisar Mesas..."
                    placeholderTextColor='white'
                    autoCapitalize='none'
                    onChangeText={(text) => {
                        setSearchMesas(text);
                        handleSearch({ descricao: text });
                    }}
                    value={searchMesas}
                />
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
                                setEditMesaId(undefined)
                                setDispDescricao(undefined)
                                setDispCapacidade(undefined)
                                setDispEmpresa(undefined)
                                setEditDescricao(undefined)
                                setEditCapacidade(undefined)
                                setSelected("")
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleEdit(false);
                                        setEditMesaId(undefined)
                                        setDispDescricao(undefined)
                                        setDispCapacidade(undefined)
                                        setDispEmpresa(undefined)
                                        setEditDescricao(undefined)
                                        setEditCapacidade(undefined)
                                        setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <TextCad>{dispDescricao}</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        autoCapitalize='none'
                                        onChangeText={(text:string) => setEditDescricao(text)}
                                        value={editDescricao}
                                    />
                                    <TextCad>{dispCapacidade}</TextCad>
                                    <Input
                                        placeholder="Capacidade"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={(text:string) => setEditCapacidade(Number.parseInt(text))}
                                        value={editCapacidade!.valueOf().toString()}
                                    />
                                    <TextCad>{dispEmpresa}</TextCad>
                                    <CSelectList
                                        setSelected={(val:any) => setSelected(val)}
                                        data={selectEmpresa}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Empresa(s)"
                                        searchPlaceholder="Pesquisar"
                                    />

                                    <Coluna>
                                        <CIconButton iconName="trash" color="red" size={50} onPress={() => handleDeleteMesa({ id: editMesaId})}/>

                                        <CIconButton iconName='save' color='black' size={50} onPress={() => handleEditMesa({
                                            id: editMesaId,
                                            descricao: editDescricao,
                                            capacidade: editCapacidade,
                                            empresa: Number.parseInt(selected ? selected : '')
                                        })} />
                                    </Coluna>
                                </HeaderModal>
                            </CColumn>
                        </Modal>
                        :
                        <></>
                    }
                     {/*FIM MODAL EDIÇÃO*/}


                    <CTableRow backgroundColor='green' data={["Descrição","Capacidade","Empresa",""]} textStyle={[{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }]}/>

                    {Array.isArray(filteredData) && filteredData.length > 0
                        ? filteredData.map((item, index) => (
                            <CTableRow backgroundColor='white' key={index} textStyle={[{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }]}
                                       data={[item.descricao, item.capacidade, item.empresa!.nome,

                                           <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                               setEditMesaId(item.id)
                                               setDispDescricao(item.descricao)
                                               setDispCapacidade(item.capacidade)
                                               setDispEmpresa(item.empresa!.nome)
                                               setEditDescricao(item.descricao)
                                               setEditCapacidade(item.capacidade!)
                                               setModalVisibleEdit(true)
                                               setSelected(item.empresa!.id?.toString())
                                           }} />

                                       ]}
                            />
                        ))
                        : Array.isArray(dados) && dados.map((item, index) => (
                            <CTableRow backgroundColor='white' key={index} textStyle={[{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }]}
                                 data={[item.descricao, item.capacidade, item.empresa!.nome,

                                     <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                         setEditMesaId(item.id)
                                         setDispDescricao(item.descricao)
                                         setDispCapacidade(item.capacidade)
                                         setDispEmpresa(item.empresa!.nome)
                                         setEditDescricao(item.descricao)
                                         setEditCapacidade(item.capacidade)
                                         setModalVisibleEdit(true)
                                         setSelected(item.empresa!.id?.toString())
                                     }} />

                                 ]}
                            />
                    ))}
                </CTable>
            </Body>

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
                                setNovaDescricao(undefined)
                                setNovaCapacidade(undefined)
                                setSelected("")
                            }}>

                            <CColumn align='center'>

                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovaDescricao(undefined)
                                        setNovaCapacidade(undefined)
                                        setSelected("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar Mesa</Text>
                                    <TextCad>*Descrição</TextCad>
                                    <Input
                                        placeholder="Descrição"
                                        onChangeText={(text:string) => setNovaDescricao(text)}
                                        value={novaDescricao}
                                    />
                                    <TextCad>*Capacidade</TextCad>
                                    <Input
                                        placeholder="Capacidade"
                                        autoCapitalize='none'
                                        keyboardType="numeric"
                                        onChangeText={(text:string) => setNovaCapacidade(Number.parseInt(text))}
                                        value={novaCapacidade?.toString()}
                                    />
                                    <TextCad>*Empresa</TextCad>
                                    <CSelectList
                                        setSelected={(val:any) => setSelected(val)}
                                        data={selectEmpresa}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Empresa(s)"
                                        searchPlaceholder="Selecione uma"
                                    />


                                    <Coluna>
                                        <Text></Text>
                                        <CIconButton iconName='save' color='black' size={40} onPress={() => handleNewMesa({
                                            descricao: novaDescricao,
                                            capacidade: novaCapacidade,
                                            empresa: Number.parseInt(selected!)
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