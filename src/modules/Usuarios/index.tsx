import React, {useEffect, useState} from "react";
import api from "../../utils/api";
import {Coluna, Container, Footer, HeaderModal, Input, Text, TextCad, InputSearch} from "./styles";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {Alert, Modal} from "react-native";
import {CIconButton} from "../../components/CIconButton";
import {CTable} from "../../components/CTable";
import {CTableRow} from "../../components/CTableRow";
import {CSelectList} from "../../components/CSelectList";
import {CMultSelectList} from "../../components/CMultSelectList";

interface IUsuario{
    id: number
    nome: string
    senha: string
    cargo: CargoOptions
    login: string
    empresa?: any
}

enum CargoOptions {
    Atendente = 'Atendente',
    Gerente = 'Gerente',
    Cozinheiro = 'Cozinheiro',
}

export function SUsuarios() {
    const [ dados, setDados ] = useState([])
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false)
    const [ selected, setSelected ] = useState('')
    const [ selectEmpresa, setSelectEmpresa ] = useState([])
    const [ selectedEmpresa, setSelectedEmpresa ] = useState("")
    const [selectCargo, setSelectCargo] = useState<CargoOptions[]>([
        CargoOptions.Gerente,
        CargoOptions.Atendente,
        CargoOptions.Cozinheiro,
    ]);

    // VARIAVEIS PARA EDIÇÃO
    const [ editUsuarioId, setEditUsuarioId] = useState(null)
    const [ editUsuario, setEditUsuario] = useState(null)
    const [ editCargo , setEditCargo ] = useState<CargoOptions[]>([
        CargoOptions.Gerente,
        CargoOptions.Atendente,
        CargoOptions.Cozinheiro,
    ]);
    const [ editSenha, setEditSenha ] = useState(null)
    const [ editLogin, setEditLogin ] = useState(null)
    const [ searchUsuario, setSearchUsuario ] = useState(null)
    const [ filteredData, setFilteredData ] = useState([]);

    // VARIAVEIS ṔARA EXIBIR
    const [ dispUsuario, setDispUsuario ] = useState(null)
    const [ dispCargo, setDispCargo ] = useState(null)
    const [ dispLogin, setDispLogin ] = useState(null)

    // VARIAVEIS PARA CRIAÇÃO
    const [ novoUsuario, setNovoUsuario ] = useState(null)
    const [ novoCargo, setNovoCargo ] = useState<CargoOptions[]>([
        CargoOptions.Gerente,
        CargoOptions.Atendente,
        CargoOptions.Cozinheiro,
    ]);
    const [ novoLogin, setNovoLogin ] = useState(null)
    const [ novaSenha, setNovaSenha ] = useState(null)

    async function handleNewUsuario({ nome, senha, login, cargo, empresa }: IUsuario){
        if (nome !== null && senha !== null && login !== null && cargo !== null && (Array.isArray(empresa) && empresa.length !== 0)){
            await api.post('/usuarios', {
                nome,
                cargo,
                login,
                senha,
                empresa
            })
                .then(response => {
                    Alert.alert('Cadastro realizado com sucesso', '', [{text: 'OK'}])
                    setModalVisibleNew(false);
                    setNovoUsuario(null)
                    setNovoCargo(null)
                    setNovoLogin(null)
                    setNovaSenha(null)
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

    function handleDeleteUsuario({ id }: IUsuario){
        if (id !== null) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Não'}, {text: 'Sim', onPress: async () => {
                    await api.delete('/usuarios/' + id)
                        .then(resp => {
                            setModalVisibleEdit(false)
                            setEditUsuarioId(null)
                            setFilteredData([])
                        })
                }}])
        }
    }

    async function handleEditUsuario({ id, nome, senha, login, cargo, empresa }: IUsuario) {
        if (id !== null) {
            await api.patch('/usuarios/' +id.toString(), {
                nome,
                cargo,
                login,
                senha,
                empresa
            })
                .then(response => {
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                    setEditUsuarioId(null);
                    setEditUsuario(null)
                    setEditLogin(null)
                    setEditCargo(null)
                    setEditSenha(null)
                    setModalVisibleEdit(false)
                    setSelected("")
                    setFilteredData([])
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    async function handleSearch({ nome }: IUsuario) {
        await api.get('/usuarios')
            .then(response => {
                const filteredResults = response.data.filter(item => item.nome.toLowerCase().includes(nome.toLowerCase()));
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
        api.get('/usuarios')
            .then(response => {
                setDados(response.data)
            })
            .catch(error => {
                console.log(error)
            }),
            api.get('/empresas')
                .then(resp => {
                    let empresa = resp.data.map((item) => {
                        return {key: item.id, value: item.nome}
                    })
                    setSelectEmpresa(empresa)
                })
                .catch(erro => {
                    console.log(erro)
                })
    }, [dados]);

    return (
        <Container>
            <CCabecalhoHome title="Usuários" />

            <Coluna>
                <InputSearch
                    placeholder="Pesquisar Usuário..."
                    placeholderTextColor='white'
                    onChangeText={(text) => {
                        setSearchUsuario(text);
                        handleSearch({ nome: text });
                    }}
                    value={searchUsuario}
                />
            </Coluna>

                <CTable>

                    {modalVisibleEdit == true
                            ?
                            // MODAL DE EDIÇÃO
                            <Modal
                                animationType="none"
                                transparent={true}
                                visible={modalVisibleEdit}
                                onRequestClose={() => {
                                    setModalVisibleEdit(false);
                                    setEditUsuarioId(null);
                                    setDispUsuario(null)
                                    setDispCargo(null)
                                    setDispLogin(null)
                                    setEditUsuario(null)
                                    setEditLogin(null)
                                    setEditCargo(null)
                                    setEditSenha(null)
                                    setSelected("")
                                    setSelectedEmpresa("")
                                }}>
                                <CColumn align='center'>
                                    <CColumn align='right' marginLeft={380} marginBottom={1}>
                                        <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                            setModalVisibleEdit(false);
                                            setEditUsuarioId(null);
                                            setDispUsuario(null)
                                            setDispCargo(null)
                                            setDispLogin(null)
                                            setEditUsuario(null)
                                            setEditLogin(null)
                                            setEditCargo(null)
                                            setEditSenha(null)
                                            setSelected("")
                                            setSelectedEmpresa("")
                                        }} />
                                    </CColumn>
                                    <HeaderModal>
                                        <TextCad>{dispUsuario}</TextCad>
                                        <Input
                                            placeholder="Nome"
                                            autoCapitalize='none'
                                            onChangeText={setEditUsuario}
                                            value={editUsuario}
                                        />
                                        <TextCad>{dispCargo}</TextCad>
                                        <CSelectList
                                            setSelected={(val) => setSelected(val)}
                                            data={editCargo}
                                            save="key"
                                            onSelect={() => selected}
                                            label="Cargo"
                                            searchPlaceholder="Pesquisar"
                                            defaultOption={{key: dispCargo, value: dispCargo }}
                                        />

                                        <TextCad>{dispLogin}</TextCad>
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

                                        <TextCad>*Empresa</TextCad>
                                        <CMultSelectList
                                            setSelected={(val) => setSelectedEmpresa(val)}
                                            data={selectEmpresa}
                                            placeholder='*Select option'
                                            save="key"
                                            onSelect={() => selectedEmpresa}
                                            label="Empresa(s)"
                                            searchPlaceholder="Selecione uma"
                                        />

                                        <CColumn />
                                        <Coluna>
                                            <CIconButton iconName="trash" color="red" size={50} onPress={() => handleDeleteUsuario({ id: editUsuarioId})}/>

                                            <CIconButton iconName='save' color='black' size={50} onPress={() => handleEditUsuario({
                                                id: editUsuarioId,
                                                nome: editUsuario,
                                                senha: editSenha,
                                                login: editLogin,
                                                cargo: selected,
                                                empresa: selectedEmpresa
                                            })} />
                                        </Coluna>
                                    </HeaderModal>
                                </CColumn>
                            </Modal>
                            // FIM MODAL EDIÇÃO
                            :
                            <></>
                    }

                    <CTableRow backgroundColor='green' data={["Nome","Cargo","Login","Senha",""]} textStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }} />

                        {Array.isArray(filteredData) && filteredData.length > 0
                            ? filteredData.map((item, index) => (
                                <CTableRow backgroundColor='white' key={index} textStyle={{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }}
                                           data={[item.nome, item.cargo, item.login, "*",

                                               <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                                   setEditUsuarioId(item.id)
                                                   setDispUsuario(item.nome)
                                                   setDispCargo(item.cargo)
                                                   setDispLogin(item.login)
                                                   setEditUsuario(item.nome)
                                                   setEditLogin(item.login)
                                                   setModalVisibleEdit(true)
                                               }} />

                                           ]}
                                />
                            ))
                            : Array.isArray(dados) && dados.map((item, index) => (
                                <CTableRow backgroundColor='white' key={index} textStyle={{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }}
                                   data={[item.nome, item.cargo, item.login, "*",

                                       <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                           setEditUsuarioId(item.id)
                                           setDispUsuario(item.nome)
                                           setDispCargo(item.cargo)
                                           setDispLogin(item.login)
                                           setEditUsuario(item.nome)
                                           setEditLogin(item.login)
                                           setModalVisibleEdit(true)
                                       }} />

                                   ]}
                                />
                        ))}

                </CTable>

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
                                setModalVisibleNew(false);
                                setNovoUsuario(null)
                                setNovoCargo(null)
                                setNovoLogin(null)
                                setNovaSenha(null)
                                setSelected('')
                                setSelectedEmpresa("")
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovoUsuario(null)
                                        setNovoCargo(null)
                                        setNovoLogin(null)
                                        setNovaSenha(null)
                                        setSelected('')
                                        setSelectedEmpresa("")
                                    }} />
                                </CColumn>
                                <HeaderModal>
                                    <Text>Cadastrar Usuario</Text>
                                    <TextCad>*Nome</TextCad>
                                    <Input
                                        placeholder="Nome"
                                        onChangeText={setNovoUsuario}
                                        value={novoUsuario}
                                    />
                                    <TextCad>*Cargo</TextCad>
                                    <CSelectList
                                        setSelected={(val) => setSelected(val)}
                                        data={selectCargo}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Cargo"
                                        searchPlaceholder="Pesquisar"
                                    />

                                    <TextCad>*Login</TextCad>
                                    <Input
                                        placeholder="Login"
                                        autoCapitalize='none'
                                        onChangeText={setNovoLogin}
                                        value={novoLogin}
                                    />
                                    <TextCad>*Senha</TextCad>
                                    <Input
                                        placeholder="Senha"
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        onChangeText={setNovaSenha}
                                        value={novaSenha}
                                    />

                                    <TextCad>*Empresa</TextCad>
                                    <CMultSelectList
                                        setSelected={(val) => setSelectedEmpresa(val)}
                                        data={selectEmpresa}
                                        placeholder='*Select option'
                                        save="key"
                                        onSelect={() => selectedEmpresa}
                                        label="Empresa(s)"
                                        searchPlaceholder="Selecione uma"
                                    />

                                    <CColumn />

                                    <Coluna>
                                        <Text></Text>
                                        <CIconButton iconName='save' color='black' size={40} onPress={() => handleNewUsuario({
                                            nome: novoUsuario,
                                            senha: novaSenha,
                                            login: novoLogin,
                                            cargo: selected,
                                            empresa: selectedEmpresa
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