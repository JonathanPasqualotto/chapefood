import React from "react";
import { Container } from "./styles";
import {TouchableOpacity, TouchableOpacityProps} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props extends TouchableOpacityProps {
    color?: string
    backgroundColor?: string
    iconName?: 'search' | 'edit' | 'plus' | 'trash' | 'save' | 'close'
    size?: number
    marginRight?: number
    marginTop?: number
    marginLeft?: number
    alignItems?: string
    justifyContent?: string

}

export function CIconButton( { onPress, iconName, color, size = 24, ...rest }: Props) {

    return (
        <Container onPress={onPress} {...rest}>
            <FontAwesome
                name={iconName}
                size={size}
                color={color ?? 'white'}
            />
        </Container>
    )
}