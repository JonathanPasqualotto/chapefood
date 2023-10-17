import { CCabecalhoHome} from "../../../../components/CCabecalhoHome";
import {Container, Text} from "./styles";
import {CColumn} from "../../../../components/CColumn";
import {CRow} from "../../../../components/CRow";
import {CButton} from "../../../../components/CButton";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

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
                    <CButton onPress={handleConsultaEmpresa} title="Ver" />
                </CRow>
                <CRow><Text>Empresa 2</Text></CRow>
                <CRow><Text>Empresa 3</Text></CRow>
            </CColumn>

        </Container>
    )
}