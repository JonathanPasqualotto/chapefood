import {CLoader} from "../../../../components/CLoader";
import {useEffect, useState} from "react";
import {Container, Divider, Footer, Input, SubTitulo} from "./styles";
import {CButton} from "../../../../components/CButton";
import {Alert} from "react-native";
import {CCabecalhoCadastro} from "../../../../components/CCabecalhoCadastro";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

export function SNovaEmpresa() {
    const [isloading, setIsloading] = useState(false);
    const [nome, setNome] = useState('')
    const navigation : NavigationProp<ParamListBase> = useNavigation();

    useEffect(() => {
        try {
            setIsloading(true);
        }
        finally {
            setIsloading(false)
        }
    }, []);

    function handleSalvar(){
        Alert.alert('Sucesso', `Salvo tudo`, [{ text: 'feitooo'}]);
        //navigation.navigate('Home')
    }

    return (
        <Container>
            <CLoader isLoading={isloading} />

            <CCabecalhoCadastro codigo={1} title="Empresa"/>

            <SubTitulo>Nome</SubTitulo>
            <Input
                autoCapitalize='none'
                placeholder='nome'
                value={nome}
                onChangeText={setNome}
            />

            <Footer>
                <CButton onPress={handleSalvar} title="Salvar" />
            </Footer>
        </Container>
    )
}