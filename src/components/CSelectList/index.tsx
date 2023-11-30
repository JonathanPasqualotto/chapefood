import React from "react";
import {Container} from "./styles";
import { StatusOptions, StatusType } from "../../modules/Relatorios";

interface Props{
  children?: any
  searchPlaceholder?: string
  placeholder?: string
  setSelected?: any
  data?: any
  save?: string
  onSelect?: any
  label?: string  
}

export function CSelectList({ children, searchPlaceholder, placeholder, ...rest }: Props){
    return(
        <Container
            searchPlaceholder={searchPlaceholder}
            placeholder={placeholder}
            inputStyles={{ color: 'black', fontSize: 20 }}
            boxStyles={{ backgroundColor: 'white', marginTop: 20 }}
            dropdownStyles={{ backgroundColor: 'white' }}
            dropdownTextStyles={{ fontSize: 20 }}
            {...rest}
            >
            {children}
        </Container>
    )
}