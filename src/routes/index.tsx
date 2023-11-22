import { NavigationContainer } from "@react-navigation/native";
import { GerenteRouter } from "./app.routes";
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { user } = useAuth()

    // VERIFICA O CARGO DO USUARIO
    const verificaCargo = user?.usuario && ['0', '1', '2'].includes(user?.cargo);

    function renderCargoRouter(cargo) {
        switch (cargo) {
            case '0': // GERENTE
                return <GerenteRouter />;
            case '1': // ATENDENTE
                return <AtendenteRouter />;
            case '2': // COZINHEIRO
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