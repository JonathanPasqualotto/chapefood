import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SHome} from '../screens/SHome'
import {SEmpresa} from "../modules/Empresa";
import {SUsuarios} from "../modules/Usuarios";
import {SMesas} from "../modules/Mesas";
import {SProdutos} from "../modules/Produtos";
import {SPedidos} from "../modules/Pedidos";
import {SOrdemServico} from "../modules/OrdemServico";

const { Screen, Navigator } = createNativeStackNavigator()

export function GerenteRouter() {
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
                name="Mesas"
                component={SMesas}
            />
            <Screen
                name="Produtos"
                component={SProdutos}
            />
            <Screen
                name="Pedidos"
                component={SPedidos}
            />
            <Screen
                name="OrdemServico"
                component={SOrdemServico}
            />
        </Navigator>
    )
}