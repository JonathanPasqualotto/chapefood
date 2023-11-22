import styled from "styled-components/native";
import {Platform} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";


const ios = Platform.OS === 'ios';

export const Header = styled.View`
  background-color: #008170;
  padding-left: ${ios ? 25 : 25}px;
  padding-top: ${ios ?  35 : 25}px;
  padding-bottom: ${ios ? 20 : 20}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-weight: bold;
  color: #fff;
`;
