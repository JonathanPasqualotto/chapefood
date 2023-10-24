import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SLogin from '../screens/SLogin'

const { Screen, Navigator } = createNativeStackNavigator()

export function AuthRoutes() {
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
        </Navigator>
    )
}