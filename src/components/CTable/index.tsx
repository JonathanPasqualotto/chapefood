import React from "react";
import {Container} from "./styles";

interface Props{
    children?: any
}

export function CTable({ children, ...rest }: Props){
    return (
        <Container {...rest}>
            {children}
        </Container>
    )
}
