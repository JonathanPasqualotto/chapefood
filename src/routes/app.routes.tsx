import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SHome} from '../screens/SHome'
import {SEmpresa} from "../modules/Empresa";
import {SUsuarios} from "../modules/Usuarios";
import {SMesas} from "../modules/Mesas";
import {SRelatorios} from "../modules/Relatorios";

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
                name="Empresas"
                component={SEmpresa}
            />
            <Screen
                name="Usuarios"
                component={SUsuarios}
            />
            <Screen
                name="Relatorios"
                component={SRelatorios}
            />
            <Screen
                name="Mesas"
                component={SMesas}
            />
        </Navigator>
    )
}