import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SHome} from '../screens/SHome'
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
                name="ListaEmpresa"
                component={SEmpresa}
            />
        </Navigator>
    )
}