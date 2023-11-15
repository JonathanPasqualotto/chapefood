import styled from "styled-components/native";
import { Width, Height } from "../../utils/dimensions"
import {Platform} from "react-native";

const ios = Platform.OS === 'ios';

interface Props{
    align?: 'left' | 'center' | 'right';
    marginRight?: number;
    marginTop?: number;
    marginLeft?: number;
    marginBottom?: number
}

const alignment = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end'
}

export const Container = styled.View<Props>`
    flex: 1;
    align-self: stretch;
    align-items: ${({ align }) => alignment[align ?? 'left']};
    padding-right: ${ios ? 2 : 2}px;
    padding-left: ${ios ? 2 : 2}px;
    justify-content: center;
    margin-right: ${({ marginRight }) => marginRight ?? 20}px;
    margin-top: ${({ marginTop }) => marginTop ?? 20}px;
    margin-left: ${({ marginLeft }) => marginLeft ?? 20}px;
    margin-bottom: ${({ marginBottom }) => marginBottom ?? 20}px;
`;