import { ModalProps } from "react-native";
import { Container, Header, Text} from "./styles";
import React from "react";
import {CButton} from "../CButton";

interface Props extends ModalProps {
    animationType?: "slide" | "fade" | "none"
    transparent?: boolean
    visible?: boolean
    onRequestClose?: string
}

export function CModal({ animationType, transparent, visible, onRequestClose, ...rest }: Props ){
    return (
        <Container animationType={animationType}
                   transparent={transparent}
                   visible={visible}
                   onRequestClose={() => {
                       onRequestClose
                   }}
                   {...rest}>
        </Container>
    )
}