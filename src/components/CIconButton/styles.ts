import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Width, Height } from "../../utils/dimensions"
import {Platform} from "react-native";

const ios = Platform.OS === 'ios';

interface Props {
    backgroundColor?: string;
    marginRight?: number;
    marginTop?: number;
    marginLeft?: number;
    alignItems?: string
    justifyContent?: string
}

export const Container = styled(TouchableOpacity)<Props>`
  height: ${Height*0.05};
  width: ${Width*0.1};
  border-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor ?? ''};
  margin-right: ${({ marginRight }) => marginRight ?? 20}px;
  margin-top: ${({ marginTop }) => marginTop ?? 20}px;
  margin-left: ${({ marginLeft }) => marginLeft ?? 20}px;
  align-items: ${({ alignItems }) => alignItems ?? 'center'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'center'};
`;