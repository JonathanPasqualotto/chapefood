import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { Width, Height } from "../../utils/dimensions";
import { Platform } from "react-native";

const ios = Platform.OS === 'ios';

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
    align-items: ${({ align }) => align ?? 'left'};
    padding: ${ios ? Height*0.01 : Height*0.05}px;
    column-gap: ${ios ? Width*0.05 : Width*0.05}px;
    ${({ justify }) => justify && css`
        justify-content: ${justify};
    `};
`;
