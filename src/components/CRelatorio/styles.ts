import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";
import {TouchableOpacityProps, Platform} from "react-native";
import {Height, Width} from "../../utils/dimensions";

const ios = Platform.OS === 'ios';

interface Props extends TouchableOpacityProps{
   // color?: string;
}

/* margin-top: ${ios ? 15 : 15}px;*/
/*width: ${ios ? Width*0.6 : Width*0.6}px;*/
/*height: ${ios ? Height*0.08 : Height*0.08};*/
/*align-items: center;*/
/*justify-content: center;*/
/*border-radius: ${ios ? 60 : 60}px;*/

export const Container = styled.View`
  background-color: white;
  margin-top: 30%;
  margin-bottom: 30%;
  color: white;
  border-width: 5px;
  border-color: red;
`;

export const Title = styled.Text`    
  color: white;
  font-size: ${RFValue(25)}px;
  font-weight: bold;
`;

export const Text = styled.Text`
  margin: 50px;
  font-size: ${RFValue(25)}px;
`;