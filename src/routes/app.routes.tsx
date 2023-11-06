import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SHome} from '../screens/SHome'
import {SLinhas} from "../screens/SLinhas";
import {SEmpresa} from "../modules/Empresa";

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
                component={SEmpresa}
            />
        </Navigator>
    )
}