import { NavigationContainer } from "@react-navigation/native";
import { GerenteRouter } from "./gerente.routes";
import {AtendenteRoutes} from "./atendente.routes";
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";
import {CozinheiroRoutes} from "./cozinheiro.routes";

export function Routes() {
    const { user } = useAuth()

    const verificaCargo = user?.usuario && ['Gerente', 'Atendente', 'Cozinheiro'].includes(user?.cargo);

    function renderCargoRouter(cargo: string) {
        switch (cargo) {
            case 'Gerente':
                return <GerenteRouter />;
            case 'Atendente':
                return <AtendenteRoutes />;
            case 'Cozinheiro':
                return <CozinheiroRoutes />
            default:
                return <AuthRoutes /> // Rota para quem não tem permissão
        }
    }

    return (
        <NavigationContainer>
            {verificaCargo ? (
                renderCargoRouter(user.cargo) // Renderiza o roteador específico para um cargo válido
            ) : user?.usuario ? (
                <AuthRoutes /> // Rota para quem não tem permissão
            ) : (
                <AuthRoutes /> // Rota para quem não tem permissão
            )}
        </NavigationContainer>
    )
}