import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";
import {TouchableOpacityProps, Platform} from "react-native";
import {Height, Width} from "../../utils/dimensions";

const ios = Platform.OS === 'ios';

interface Props extends TouchableOpacityProps{
   // color?: string;
}

export const Container = styled.TouchableOpacity`
  background-color: #638d3c;
  margin-top: ${ios ? 15 : 15}px;
  margin: 70%;
  width: ${ios ? Width*0.6 : Width*0.6}px;
  height: ${ios ? Height*0.08 : Height*0.08};
  align-items: center;
  justify-content: center;
  border-radius: ${ios ? 60 : 60}px;
`;

export const Title = styled.Text`    
  color: white;
  font-size: ${RFValue(25)}px;
  font-weight: bold;
`;