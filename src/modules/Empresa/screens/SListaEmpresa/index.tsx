import React from "react";
import { CCabecalhoHome} from "../../../../components/CCabecalhoHome";
import {Container, HeaderModal, Text} from "./styles";
import {CColumn} from "../../../../components/CColumn";
import {CRow} from "../../../../components/CRow";
import { NavigationProp, ParamListBase, useNavigation, useRoute } from "@react-navigation/native";
import {CIconButton} from "../../../../components/CIconButton";
import api from "../../../../utils/api";
import {useEffect, useState} from "react";
import { Modal, Alert, View, Pressable, StyleSheet, FlatList } from "react-native";
import {CModal} from "../../../../components/CModal";
import {CButton} from "../../../../components/CButton";

interface empresaProps{
    nome?: string;
    codigo?: number;
}

export function SListaEmpresa({ nome, codigo }: empresaProps) {
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    const [ empresas, setEmpresas ] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    function handleDeleteEmpresa(id) {
        console.log(id)
       // api.delete('/empresas/',emp.id)
    }

    function handleEditEmpresa(){
        setModalVisible(false)
    }

    useEffect(() => {
        api.get('/empresas')
            .then(response=>{
                setEmpresas(response.data)
            })
    }, []);

    return (
        <Container>
            <CCabecalhoHome title='Empresa' />

            <CColumn>

                <FlatList
                    data={empresas}
                    renderItem={({item}) =>

                        <Text>{item.nome}

                            <CIconButton iconName="edit" color="blue" size={45} onPress={() => setModalVisible(true)} />
                            <CIconButton onPress={() => setModalVisible(true)} iconName="trash" color="red" size={45} />

                            <CModal  animationType="none" transparent={true} visible={modalVisible} onRequestClose="setModalVisible(!modalVisible)">
                                <CColumn>
                                    <HeaderModal>
                                        <Text>TESTE DA MODAL</Text>
                                        <Text>MAIS UM SÓ PRA VER</Text>
                                        <CButton title="Editar" onPress={() => handleEditEmpresa()} />
                                        <CButton title="Excluir" onPress={() => handleDeleteEmpresa(item.id)} />
                                    </HeaderModal>
                                </CColumn>
                            </CModal>

                        </Text>

                    }
                    keyExtractor={item => item.id}
                />

            </CColumn>

            {/*<CModal  animationType="none" transparent={true} visible={modalVisible} onRequestClose="setModalVisible(!modalVisible)">*/}
            {/*    <CColumn>*/}
            {/*        <HeaderModal>*/}
            {/*            <Text>TESTE DA MODAL</Text>*/}
            {/*            <Text>MAIS UM SÓ PRA VER</Text>*/}
            {/*            <CButton title="Voltar" onPress={() => setModalVisible(false)} />*/}
            {/*            <CButton title="Excluir" onPress={() => handleDeleteEmpresa(emp.id)} />*/}
            {/*        </HeaderModal>*/}
            {/*    </CColumn>*/}
            {/*</CModal>*/}

        </Container>
    )
}