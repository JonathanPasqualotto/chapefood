import { NavigationContainer } from "@react-navigation/native";
import { GerenteRouter } from "./app.routes";
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { user } = useAuth()

    // VERIFICA O CARGO DO USUARIO
    const verificaCargo = user?.usuario && ['Atendente', 'Gerente', 'Cozinheiro'].includes(user?.cargo);

    function renderCargoRouter(cargo) {
        switch (cargo) {
            case 'Atendente':
                return <AtendenteRouter />;
            case 'Gerente':
                return <GerenteRouter />;
            case 'Garçom':
                return <GarcomRouter />;
            case 'Cozinheiro':
                return <CozinheiroRouter />;
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