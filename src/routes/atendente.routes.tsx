import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SPedidos} from "../modules/Pedidos";

const { Screen, Navigator } = createNativeStackNavigator()
export function AtendenteRoutes(){
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Pedidos"
                component={SPedidos}
            />
        </Navigator>
    )
}