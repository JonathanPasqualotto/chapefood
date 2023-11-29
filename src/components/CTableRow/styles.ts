import styled from "styled-components/native";
import { Row } from "react-native-table-component";
import { Width, Height } from "../../utils/dimensions";
import { Platform } from "react-native";

const ios = Platform.OS === 'ios'

interface Props{
    marginRight?: number
    marginTop?: number
    marginLeft?: number
    marginBottom?: number
    backgroundColor?: string
    style?: any
    children?: any
}

export const Container = styled(Row)<Props>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? 'white'};
  margin-top: ${({ marginTop }) => marginTop ?? 20}px;
  margin-left: ${({ marginLeft }) => marginLeft ?? 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom ?? 0}px;
  margin-right: ${({ marginRight }) => marginRight ?? 0}px;
  height: ${ios ? Height*0.06 : Height*0.08}px;
  padding: 10px;
`;