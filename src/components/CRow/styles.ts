import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props{
    align?: 'left' | 'center' | 'right';
    justify?: 'center';
    cols?: number;
}

const alignment = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end'
}

export const Container = styled.View<Props>`
    flex-direction: row;
    align-items: ${({ align }) => alignment[align ?? 'left']};
    padding: ${RFValue(3)}px 0 ${RFValue(3)}px 0;
    column-gap: ${RFValue(10)}px;
    ${({ justify }) => justify && css`
        justify-content: ${justify};
    `};
`;
