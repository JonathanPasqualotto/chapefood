import React from "react";
import {Container} from "./styles";

interface Props{
    children?: any
    searchPlaceholder?: string
    placeholder?: string
    defaultOption?: any
}

export function CMultSelectList({ children, searchPlaceholder, placeholder, defaultOption, ...rest }: Props){
    return (
        <Container
            searchPlaceholder={searchPlaceholder}
            placeholder={placeholder}
            inputStyles={{ color: 'black', fontSize: 20 }}
            boxStyles={{ backgroundColor: 'white', marginTop: 20 }}
            dropdownStyles={{ backgroundColor: 'white' }}
            dropdownTextStyles={{ fontSize: 20 }}
            defaultOption={defaultOption}
            {...rest}>
            {children}
        </Container>
    )
}