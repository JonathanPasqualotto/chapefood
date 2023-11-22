import React from "react";
import {Container} from "./styles";

interface Props{
    children?: any
    searchPlaceholder?: string
    placeholder?: string
    initialSelected?: string
}

export function CSelectList({ children, searchPlaceholder, placeholder, initialSelected, ...rest }: Props){
    return(
        <Container
            searchPlaceholder={searchPlaceholder}
            placeholder={placeholder}
            inputStyles={{ color: 'black', fontSize: 20 }}
            boxStyles={{ backgroundColor: 'white', marginTop: 20 }}
            dropdownStyles={{ backgroundColor: 'white' }}
            dropdownTextStyles={{ fontSize: 20 }}
            initialSelected={initialSelected}
            {...rest}>
            {children}
        </Container>
    )
}