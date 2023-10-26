import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SHome} from '../screens/SHome'
import SLogin from '../screens/SLogin'
import {SLinhas} from "../screens/SLinhas";
import {SAlterarEmpresa} from "../modules/Empresa/screens/SAlterarEmpresa";
import {SListaEmpresa} from "../modules/Empresa/screens/SListaEmpresa";

const { Screen, Navigator } = createNativeStackNavigator()

export function AppRouter() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name='Home'
                component={SHome}
            />
            <Screen
                name='Linha'
                component={SLinhas}
            />
            <Screen
                name="ListaEmpresa"
                component={SListaEmpresa}
            />
            <Screen
                name='AlterarEmpresa'
                component={SAlterarEmpresa}
            />
        </Navigator>
    )
}