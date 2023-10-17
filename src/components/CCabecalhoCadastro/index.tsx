import React from "react";
import {Header, Title} from "./styles";
import {TextProps} from "react-native";

interface Props extends TextProps {
    codigo?: number;
    title?: string;
}
export function CCabecalhoCadastro({ codigo, title, ...rest } : Props) {
    return (
        <Header>
            <Title>{codigo ? 'Alterar' : 'Adicionar'} {title}</Title>
        </Header>
    )
}