import { NavigationContainer } from "@react-navigation/native";
import { AppRouter } from "./app.routes";
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { user } = useAuth()
    return (
        <NavigationContainer>
            { user?.usuario ? <AppRouter /> : <AuthRoutes />}
        </NavigationContainer>
    )
}