import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SOrdemServico} from "../modules/OrdemServico";


const { Screen, Navigator } = createNativeStackNavigator()
export function CozinheiroRoutes(){
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Cozinheiro"
                component={SOrdemServico}
            />
        </Navigator>
    )
}