import {CLoader} from "../../../../components/CLoader";
import {useEffect, useState} from "react";
import {Container, Footer, Input, SubTitulo} from "./styles";
import {Alert} from "react-native";
import {CCabecalhoCadastro} from "../../../../components/CCabecalhoCadastro";
import {NavigationProp, ParamListBase, useNavigation, useRoute} from "@react-navigation/native";
import {CIconButton} from "../../../../components/CIconButton";
//
// interface Props extends TouchableOpacityProps{
//     codigo?: number;
//
// }

export function SAlterarEmpresa() {
    const [isloading, setIsloading] = useState(false);
    const [nome, setNome] = useState('')
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    const route = useRoute();
    const id = route.params.id;
    const name = route.params.nome

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

            <CCabecalhoCadastro codigo={id} title="Empresa"/>

            <SubTitulo>*{name}</SubTitulo>
            <Input
                autoCapitalize='none'
                placeholder='nome'
                value={nome}
                onChangeText={setNome}
            />

            <Footer>
                <CIconButton onPress={handleSalvar} iconName="save" color="black" size={45} />
            </Footer>
        </Container>
    )
}