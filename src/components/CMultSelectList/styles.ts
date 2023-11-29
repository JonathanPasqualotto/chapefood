import styled from "styled-components/native";
import { MultipleSelectList } from "react-native-dropdown-select-list/index";

interface Props {
    searchPlaceholder?: string
    placeholder?: string
    inputStyles?: any
    boxStyles?: any
    dropdownStyles?: any
    dropdownTextStyles?: any
    defaultOption?: any
    children?: any
    setSelected?: any
    data?:any
}

export const Container = styled(MultipleSelectList)<Props>`

`;