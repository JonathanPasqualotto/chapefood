import React from "react";
import {Container} from "./styles";

interface Props{
    children?: any
    searchPlaceholder?: string
    fontSize?: number
}

export function CSelectList({ children, searchPlaceholder, fontSize, ...rest }: Props){
    return(
        <Container
            searchPlaceholder={searchPlaceholder}
            inputStyles={{ color: 'black', fontSize: 20 }}
            boxStyles={{ backgroundColor: 'white', marginTop: 20 }}
            dropdownStyles={{ backgroundColor: 'white' }}
            dropdownTextStyles={{ fontSize: 20 }}
            {...rest}>
            {children}
        </Container>
    )
}