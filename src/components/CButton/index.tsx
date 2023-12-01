import { Container, Title } from "./styles";
import {TouchableOpacityProps} from "react-native";

interface Props extends TouchableOpacityProps{
    title?: string;
    color?: string;
}

export function CButton({ onPress, title, color, ...rest } : Props) {
    return (
        <Container onPress={onPress} {...rest} >
            <Title>{title}</Title>
        </Container>
    )
}