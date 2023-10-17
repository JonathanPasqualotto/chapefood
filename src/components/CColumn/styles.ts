import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface Props{
    align?: 'left' | 'center' | 'right';
    cols?: number;
}

const alignment = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end'
}

export const Container = styled.View<Props>`
    flex: ${({ cols }) => cols};
    align-self: stretch;
    align-items: ${({ align }) => alignment[align ?? 'left']};
    padding-right: ${RFValue(2)}px;
    padding-left: ${RFValue(2)}px;
    justify-content: center;
`;