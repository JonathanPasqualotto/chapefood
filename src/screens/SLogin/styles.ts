import styled from "styled-components/native"
import {RFValue} from "react-native-responsive-fontsize";
import { Width, Height } from "../../utils/dimensions"
import {Platform} from "react-native";

const ios = Platform.OS === 'ios';
export const Input = styled.TextInput`
  font-size: ${RFValue(22)}px;
  margin-top: ${ios ? Height*0.3 : Height*0.35}px;
  padding: ${ios ? 15 : 10}px ${ios ? 20 : 28}px;
  border: black 1px solid;
  border-radius: ${ios ? 20 : 20}px;
  width: ${ios ? Width*0.8 : Width*0.8 }px;
  background-color: white;
`;

export const InputSenha = styled.TextInput`
  font-size: ${RFValue(22)}px;
  margin-top: ${ios ? 10 : 10}px;
  padding: ${ios ? 15 : 10}px ${ios ? 20 : 28}px;
  border: black 1px solid;
  border-radius: ${ios ? 20 : 20}px;
  width: ${ios ? Width*0.8 : Width*0.8 }px;
  background-color: white;
`;

export const Logo = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${ios ? Height*0.05 : Height*0.05}px;
  width: ${Width}px;
  height: ${Height*0.5}px;
  background-repeat: no-repeat;
`;