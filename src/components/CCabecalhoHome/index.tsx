import React from "react";
import {Header, Title} from "./styles";
import {TextProps} from "react-native";

interface Props extends TextProps {
    title?: string;
}
export function CCabecalhoHome({ title, ...rest } : Props) {
    return (
        <Header>
            <Title>{title}</Title>
        </Header>
    )
}