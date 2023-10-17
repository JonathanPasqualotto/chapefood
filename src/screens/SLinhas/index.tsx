import { LinhaContainer, Body, Text1, Text} from "./styles";

export function SLinhas() {
    return (
        <Body>
            <LinhaContainer>
                <Text>MESA 1</Text>
                <Text1>Valor total:</Text1>
            </LinhaContainer>
            <LinhaContainer>
                <Text>MESA 2</Text>
                <Text1>Valor total:</Text1>
            </LinhaContainer>
            <LinhaContainer>
                <Text>MESA 3</Text>
                <Text1>Valor total:</Text1>
            </LinhaContainer>
            <LinhaContainer>
                <Text>MESA 4</Text>
                <Text1>Valor total:</Text1>
            </LinhaContainer>
        </Body>
    )
}