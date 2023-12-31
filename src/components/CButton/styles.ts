import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";
import {TouchableOpacityProps, Platform, TouchableOpacity} from "react-native";
import {Height, Width} from "../../utils/dimensions";

const ios = Platform.OS === 'ios';

interface Props extends TouchableOpacityProps{
    color?: string;
}

export const Container = styled(TouchableOpacity)<Props>`
  background-color: ${({ color }) => color ?? '#638d3c'};
  margin-top: ${ios ? 15 : 15}px;
  width: ${ios ? Width*0.6 : Width*0.6}px;
  height: ${ios ? Height*0.08 : Height*0.08}px;
  align-items: center;
  justify-content: center;
  border-radius: ${ios ? 60 : 60}px;
`;

export const Title = styled.Text`
  color: white;
  font-size: ${RFValue(25)}px;
  font-weight: bold;
`;