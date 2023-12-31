import { Container, Title } from "./styles";
import {TouchableOpacityProps} from "react-native";

interface Props extends TouchableOpacityProps{
    title?: string;
}

export function CButtonRelatorio({ onPress, title, ...rest } : Props) {
    return (
        <Container onPress={onPress} {...rest} >
            <Title>{title}</Title>
        </Container>
    )
}