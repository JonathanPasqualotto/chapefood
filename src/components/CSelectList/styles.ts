import styled from "styled-components/native";
import { SelectList } from "react-native-dropdown-select-list/index";

interface Props{
    boxStyles?:any
    dropdownStyles?:any
    searchPlaceholder?:any
    placeholder?:any
    children?:any
    inputStyles?:any
    dropdownTextStyles?:any
    setSelected?:any
    data?:any
    save?: string
    onSelect?: any
}

export const Container = styled(SelectList)<Props>`

`;