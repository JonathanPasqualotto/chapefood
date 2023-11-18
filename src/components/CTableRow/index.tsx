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
    style?: any[]
    textStyle?: any[]
}

export function CTableRow({ children, data, textStyle, style, marginTop, marginRight, marginBottom, marginLeft, ...rest }: Props){
    return (
        <Container
            data={data}
            textStyle={textStyle}
            style={style}
            {...rest}>
            {children}
        </Container>
    )
}