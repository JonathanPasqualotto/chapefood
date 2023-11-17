import React from "react";
import {Container} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

interface Props{
    children?: any
    data?: any
    marginRight?: number
    marginTop?: number
    marginLeft?: number
    marginBottom?: number
    backgroundColor?: string
    textStyle: {
        color: string;
        fontSize: number;
        fontWeight: string;
        textAlign: string;}
}

export function CTableRow({ children, data, textStyle, ...rest }: Props){
    return (
        <Container
            data={data}
            textStyle={textStyle}
            {...rest}>
            {children}
        </Container>
    )
}