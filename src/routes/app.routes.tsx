import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SHome} from '../screens/SHome'
import SLogin from '../screens/SLogin'
import {SLinhas} from "../screens/SLinhas";
import {SNovaEmpresa} from "../modules/Empresa/screens/SNovaEmpresa";
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
                name= 'Login'
                component={SLogin}
            />
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
                name='NovaEmpresa'
                component={SNovaEmpresa}
            />
        </Navigator>
    )
}