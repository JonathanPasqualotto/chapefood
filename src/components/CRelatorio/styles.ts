import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";
import {TouchableOpacityProps, Platform} from "react-native";
import {Height, Width} from "../../utils/dimensions";

const ios = Platform.OS === 'ios';

export const Container = styled.SafeAreaView`
  margin-top: 10%;
  margin-bottom: 30%;
  color: white;
`;

export const Body = styled.ScrollView`

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

export const TableHead = styled.Text`
  padding: 5px;
  background-color: #5c5c5c;
  margin-bottom: 5px;
  color: black;
  font-size: ${RFValue(33)}px;
`;

export const TableFooter = styled.Text`
  padding: 5px;
  background-color: #c4c4c4;
  marginBottom: 15px;
  font-size: ${RFValue(20)}px;
  fontWeight: bold;
`;

export const TextEmpty = styled.Text`
  color: white;
  font-size: ${RFValue(20)}px;
  margin-top: 2%;
  margin-bottom: 2%;
`;

export const TableRow = styled.Text`
  text-align: center;
  background-color: gray;
  padding: 5px;
  font-size: ${RFValue(25)}px;
  margin-bottom: 5px;
`;

export const Total = styled.Text`
  color: black;
  font-size: ${RFValue(30)}px;
  padding-right: 40%;
  padding-top: 5%;
  padding-bottom: 5%;
  text-align: left;
  background-color: white;
  font-weight: bold;
`;

export const Footer = styled.View`
  align-items: center;
  justify-content: center;
  padding-right: ${ios ? 20 : 20}px;
`;