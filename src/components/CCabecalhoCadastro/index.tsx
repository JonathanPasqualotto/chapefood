import React from "react";
import {Header, Title} from "./styles";
import {TextProps} from "react-native";

interface Props extends TextProps {
    codigo?: number;
    title?: string;
}
export function CCabecalho({ codigo, title, ...rest } : Props) {
    return (
        <Header>
            <Title>{codigo ? 'Alterando' : 'Adicionando'} {title}</Title>
        </Header>
    )
}