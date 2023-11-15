import React, {useEffect, useState} from "react";
import api from "../../utils/api";
import {Container, Footer, HeaderModal, Input, Text, TextCad} from "./styles";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {Alert, FlatList, Modal} from "react-native";
import {CRow} from "../../components/CRow";
import {CIconButton} from "../../components/CIconButton";
import {CButton} from "../../components/CButton";

interface IUsuario{
    id: number
    nome: string
    senha: string
    cargo: string
    login: string
}

export function SUsuarios() {
    const [ dados, setDados ] = useState([])
    const [ modalVisibleNew, setModalVisibleNew ] = useState(false)
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false);

    // VARIAVEIS PARA EDIÇÃO
    const [ editUsuarioId, setEditUsuarioId] = useState(null)
    const [ editUsuario, setEditUsuario] = useState()
    const [ editCargo, setEditCargo ] = useState()
    const [ editSenha, setEditSenha ] = useState()
    const [ editLogin, setEditLogin ] = useState()

    // VARIAVEIS ṔARA EXIBIR
    const [ dispUsuario, setDispUsuario ] = useState()
    const [ dispCargo, setDispCargo ] = useState()
    const [ dispLogin, setDispLogin ] = useState()

    // VARIAVEIS PARA CRIAÇÃO
    const [ novoUsuario, setNovoUsuario ] = useState()
    const [ novoCargo, setNovoCargo ] = useState()
    const [ novoLogin, setNovoLogin ] = useState()
    const [ novaSenha, setNovaSenha ] = useState()


    async function handleNewUsuario({ nome, senha, login, cargo }: IUsuario){
        if (nome !== null){
            await api.post('/usuarios', {
                nome,
                cargo,
                login,
                senha,
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
        setNovoUsuario(null)
        setNovoCargo(null)
        setNovoLogin(null)
        setNovaSenha(null)
    }

    function handleDeleteUsuario({ id }: IUsuario){
        if (id !== null) {
            Alert.alert('Deseja excluir o item selecionado?', '', [{text: 'Não'}, {text: 'Sim', onPress: async () => {
                    await api.delete('/usuarios/' + id)
                }}])
        }
    }

    async function handleEditUsuario({ id, nome, senha, login, cargo }: IUsuario) {
        if (id !== null) {
            await api.patch('/usuarios/' +id, {
                nome,
                cargo,
                login,
                senha,
            })
                .then(response => {
                    //console.log('OK')
                    Alert.alert('Ajustes realizados com sucesso', '', [{text: 'OK'}])
                })
                .catch(error => {
                    console.log(error)
                });
        }
        setEditUsuarioId(null);
        setEditUsuario(null)
        setEditLogin(null)
        setEditCargo(null)
        setEditSenha(null)
        setModalVisibleEdit(false)
    }

    useEffect(() => {
        api.get('/usuarios')
            .then(response => {
                setDados(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [dados]);

    return (
        <Container>
            <CCabecalhoHome title="Usuários" />

            <CColumn marginLeft={20} marginTop={50}>

                <FlatList
                    data={dados}
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
                                            <Text>{item.nome}</Text>
                                            <Text>{item.cargo}</Text>
                                            <Text>{item.login}
                                                <CIconButton iconName="edit" color="blue" size={60} onPress={() => {
                                                    setEditUsuarioId(item.id)
                                                    setDispUsuario(item.nome)
                                                    setDispCargo(item.cargo)
                                                    setDispLogin(item.login)
                                                    setEditUsuario(item.nome)
                                                    setEditLogin(item.login)
                                                    setEditCargo(item.cargo)
                                                    //setEditSenha(null)  VER A SENHA
                                                    setModalVisibleEdit(true)
                                                }} />

                                                <CIconButton iconName="trash" color="red" size={60} onPress={() => handleDeleteUsuario({id: item.id})} />

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
                                                            setEditUsuarioId(null);
                                                            setDispUsuario(null)
                                                            setDispCargo(null)
                                                            setDispLogin(null)
                                                            setEditUsuario(null)
                                                            setEditLogin(null)
                                                            setEditCargo(null)
                                                            setEditSenha(null)
                                                        }}>
                                                        <CColumn align='center'>
                                                            <HeaderModal>
                                                                <TextCad>*{dispUsuario}</TextCad>
                                                                <Input
                                                                    placeholder="Nome"
                                                                    autoCapitalize='none'
                                                                    onChangeText={setEditUsuario}
                                                                    value={editUsuario}
                                                                />
                                                                <TextCad>*{dispCargo}</TextCad>
                                                                <Input
                                                                    placeholder="Cargo"
                                                                    autoCapitalize='none'
                                                                    onChangeText={setEditCargo}
                                                                    value={editCargo}
                                                                />
                                                                <TextCad>*{dispLogin}</TextCad>
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
                                                                <CButton title="Cancelar" onPress={() => {
                                                                    setModalVisibleEdit(false);
                                                                    setEditUsuarioId(null);
                                                                    setDispUsuario(null)
                                                                    setDispCargo(null)
                                                                    setDispLogin(null)
                                                                    setEditUsuario(null)
                                                                    setEditLogin(null)
                                                                    setEditCargo(null)
                                                                    setEditSenha(null)
                                                                }} />
                                                                <CButton title="Salvar" onPress={() => handleEditUsuario({
                                                                    id: editUsuarioId,
                                                                    nome: editUsuario,
                                                                    senha: editSenha,
                                                                    login: editLogin,
                                                                    cargo: editCargo})} />
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
                                            <Text>{item.nome}</Text>
                                            <Text>{item.cargo}</Text>
                                            <Text>{item.login}
                                                <CIconButton iconName="edit" color="blue" size={60} onPress={() => {
                                                    setEditUsuarioId(item.id)
                                                    setDispUsuario(item.nome)
                                                    setDispCargo(item.cargo)
                                                    setDispLogin(item.login)
                                                    setEditUsuario(item.nome)
                                                    setEditLogin(item.login)
                                                    setEditCargo(item.cargo)
                                                    //setEditSenha(null)  VER A SENHA
                                                    setModalVisibleEdit(true)
                                                }} />

                                                <CIconButton iconName="trash" color="red" size={60} onPress={() => handleDeleteUsuario({id: item.id})} />

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
                                                            setEditUsuarioId(null);
                                                            setDispUsuario(null)
                                                            setDispCargo(null)
                                                            setDispLogin(null)
                                                            setEditUsuario(null)
                                                            setEditLogin(null)
                                                            setEditCargo(null)
                                                            setEditSenha(null)
                                                        }}>
                                                        <CColumn align='center'>
                                                            <HeaderModal>
                                                                <Text>*{dispUsuario}</Text>
                                                                <TextCad>Nome</TextCad>
                                                                <Input
                                                                    placeholder="Nome"
                                                                    autoCapitalize='none'
                                                                    onChangeText={setEditUsuario}
                                                                    value={editUsuario}
                                                                />
                                                                <TextCad>*{dispCargo}</TextCad>
                                                                <Input
                                                                    placeholder="Cargo"
                                                                    autoCapitalize='none'
                                                                    onChangeText={setEditCargo}
                                                                    value={editCargo}
                                                                />
                                                                <TextCad>*{dispLogin}</TextCad>
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
                                                                <CButton title="Cancelar" onPress={() => {
                                                                    setModalVisibleEdit(false);
                                                                    setEditUsuarioId(null);
                                                                    setDispUsuario(null)
                                                                    setDispCargo(null)
                                                                    setDispLogin(null)
                                                                    setEditUsuario(null)
                                                                    setEditLogin(null)
                                                                    setEditCargo(null)
                                                                    setEditSenha(null)
                                                                }} />
                                                                <CButton title="Salvar" onPress={() => handleEditUsuario({
                                                                    id: editUsuarioId,
                                                                    nome: editUsuario,
                                                                    senha: editSenha,
                                                                    login: editLogin,
                                                                    cargo: editCargo})} />
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
                                setNovoUsuario(null)
                                setNovoCargo(null)
                                setNovoLogin(null)
                                setNovaSenha(null)
                            }}>
                            <CColumn align='center'>
                                <HeaderModal>
                                    <Text>Cadastrar novo Usuario</Text>
                                    <TextCad>Nome</TextCad>
                                    <Input
                                        placeholder="Nome"
                                        autoCapitalize='none'
                                        onChangeText={setNovoUsuario}
                                        value={novoUsuario}
                                    />
                                    <TextCad>Cargo</TextCad>
                                    <Input
                                        placeholder="Cargo"
                                        autoCapitalize='none'
                                        onChangeText={setNovoCargo}
                                        value={novoCargo}
                                    />
                                    <TextCad>Login</TextCad>
                                    <Input
                                        placeholder="Login"
                                        autoCapitalize='none'
                                        onChangeText={setNovoLogin}
                                        value={novoLogin}
                                    />
                                    <TextCad>Senha</TextCad>
                                    <Input
                                        placeholder="Senha"
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        onChangeText={setNovaSenha}
                                        value={novaSenha}
                                    />
                                    <CButton title="Cancelar" onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovoUsuario(null)
                                        setNovoCargo(null)
                                        setNovoLogin(null)
                                        setNovaSenha(null)
                                    }} />
                                    <CButton title="Salvar" onPress={() => handleNewUsuario({
                                        nome: novoUsuario,
                                        senha: novaSenha,
                                        login: novoLogin,
                                        cargo: novoCargo
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