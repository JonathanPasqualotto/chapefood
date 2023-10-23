import { CCabecalhoHome} from "../../../../components/CCabecalhoHome";
import {Container, Text} from "./styles";
import {CColumn} from "../../../../components/CColumn";
import {CRow} from "../../../../components/CRow";
import {CButton} from "../../../../components/CButton";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import {CIconButton} from "../../../../components/CIconButton";

export function SListaEmpresa() {
    const navigation : NavigationProp<ParamListBase> = useNavigation();
    function handleConsultaEmpresa(){
        navigation.navigate('NovaEmpresa')
    }

    return (
        <Container>
            <CCabecalhoHome title='Empresa' />

            <CColumn>
                <CRow>
                    <Text>Empresa 1</Text>
                    {/*<CButton onPress={handleConsultaEmpresa} title="Alter" />*/}
                    <CIconButton onPress={handleConsultaEmpresa} iconName="edit" color="black" size={45} />
                    <CIconButton onPress={handleConsultaEmpresa} iconName="trash" color="black" size={45} />
                </CRow>
                <CRow><Text>Empresa 2</Text></CRow>
                <CRow><Text>Empresa 3</Text></CRow>
            </CColumn>

        </Container>
    )
}