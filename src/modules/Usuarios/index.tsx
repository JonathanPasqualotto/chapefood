import React, {useEffect, useState} from "react";
import api from "../../utils/api";
import {Coluna, Container, Footer, HeaderModal, Input, Text, TextCad} from "./styles";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import {CColumn} from "../../components/CColumn";
import {Alert, Modal} from "react-native";
import {CIconButton} from "../../components/CIconButton";
import {CTable} from "../../components/CTable";
import {CTableRow} from "../../components/CTableRow";
import {CSelectList} from "../../components/CSelectList";

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
    const [ modalVisibleEdit, setModalVisibleEdit] = useState(false)
    const [ selected, setSelected ] = useState('')
    const [ selectCargo, setSelectCargo ] = useState('');

    // VARIAVEIS PARA EDIÇÃO
    const [ editUsuarioId, setEditUsuarioId] = useState(null)
    const [ editUsuario, setEditUsuario] = useState(null)
    const [ editCargo, setEditCargo] = useState(null);
    const [ editSenha, setEditSenha ] = useState(null)
    const [ editLogin, setEditLogin ] = useState(null)

    // VARIAVEIS ṔARA EXIBIR
    const [ dispUsuario, setDispUsuario ] = useState(null)
    const [ dispCargo, setDispCargo ] = useState<string | null>(null)
    const [ dispLogin, setDispLogin ] = useState(null)

    // VARIAVEIS PARA CRIAÇÃO
    const [ novoUsuario, setNovoUsuario ] = useState(null)
    const [ novoCargo, setNovoCargo] = useState(null);
    const [ novoLogin, setNovoLogin ] = useState(null)
    const [ novaSenha, setNovaSenha ] = useState(null)

    const cargoOptions = [
        {key:'0', value:'Gerente'},
        {key:'1', value:'Atendente'},
        {key:'2', value:'Cozinheiro'},
    ]

    const mapCargoValueToDescription = (value: number): string => {
        switch (value) {
            case '0':
                return 'Gerente';
            case '1':
                return 'Atendente';
            case '2':
                return 'Cozinheiro';
            default:
                return ''; // ou outra ação padrão, dependendo dos seus requisitos
        }
    };

    async function handleNewUsuario({ nome, senha, login, cargo }: IUsuario){
        console.log(cargo)
        if (nome !== null && senha !== null && login !== null && cargo !== null){
            await api.post('/usuarios', {
                nome,
                cargo,
                login,
                senha,
            })
                .then(response => {
                    Alert.alert('Cadastro realizado com sucesso', '', [{text: 'OK'}])
                    setModalVisibleNew(false);
                    setNovoUsuario(null)
                    setNovoCargo(null)
                    setNovoLogin(null)
                    setNovaSenha(null)
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
                }}])
        }
        setModalVisibleEdit(false)
        setEditUsuarioId(null)
    }

    async function handleEditUsuario({ id, nome, senha, login, cargo }: IUsuario) {
        if (id !== null) {
            await api.patch('/usuarios/' +id.toString(), {
                nome,
                cargo,
                login,
                senha,
            })
                .then(response => {
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
                                        <Input
                                            placeholder="Cargo"
                                            onChangeText={setEditCargo}
                                            value={editCargo}
                                        />

                                        <CSelectList
                                            setSelected={(val) => setSelected(val)}
                                            data={cargoOptions}
                                            save="key"
                                            onSelect={() => selected}
                                            label="Cargo"
                                            searchPlaceholder="Pesquisar"
                                            defaultOption={'1'} // VER ISSO NO DOC
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
                                        <CColumn />
                                        <Coluna>
                                            <CIconButton iconName="trash" color="red" size={50} onPress={() => handleDeleteUsuario({ id: editUsuarioId})}/>

                                            <CIconButton iconName='save' color='black' size={50} onPress={() => handleEditUsuario({
                                                id: editUsuarioId,
                                                nome: editUsuario,
                                                senha: editSenha,
                                                login: editLogin,
                                                cargo: editCargo
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

                        {Array.isArray(dados) && dados.map((item, index) => (
                            <CTableRow backgroundColor='white' key={index} textStyle={{ color: 'black', fontSize: 18, fontWeight: 'normal', textAlign: 'center' }}
                               data={[item.nome, mapCargoValueToDescription(item.cargo), item.login, "*",

                                   <CIconButton style={{ alignSelf: 'center' }} marginBottom={15} iconName="edit" color="blue" size={30} onPress={() => {
                                       setEditUsuarioId(item.id)
                                       setDispUsuario(item.nome)
                                       setDispCargo(item.cargo)
                                       setDispLogin(item.login)
                                       setEditUsuario(item.nome)
                                       setEditLogin(item.login)
                                       setEditCargo(item.cargo)
                                      // setEditSenha(null)
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
                            }}>
                            <CColumn align='center'>
                                <CColumn align='right' marginLeft={380} marginBottom={1}>
                                    <CIconButton marginLeft={180} iconName='close' color='red' size={40} onPress={() => {
                                        setModalVisibleNew(false)
                                        setNovoUsuario(null)
                                        setNovoCargo(null)
                                        setNovoLogin(null)
                                        setNovaSenha(null)
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
                                        data={cargoOptions}
                                        save="key"
                                        onSelect={() => selected}
                                        label="Cargo"
                                        searchPlaceholder="Pesquisar"
                                        initialSelected={editCargo}
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

                                    <CColumn />

                                    <Coluna>
                                        <Text></Text>
                                        <CIconButton iconName='save' color='black' size={40} onPress={() => handleNewUsuario({
                                            nome: novoUsuario,
                                            senha: novaSenha,
                                            login: novoLogin,
                                            cargo: selected
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