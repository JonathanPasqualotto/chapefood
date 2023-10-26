import styled from "styled-components/native";
import { Width, Height } from "../../../../utils/dimensions"
import {Platform} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";


const ios = Platform.OS === 'ios';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Divider = styled.View`
margin-left: ${ios ? 10 : 10}px;
margin-right: ${ios ? 10 : 10}px; 
margin-bottom: ${ios ? 15 : 15}px; 
border-Bottom-Color: black;
border-bottom-width: ${Width*0.01};    
`;

export const SubTitulo = styled.Text`
    color: #000;
    font-weight: bold;
    font-size: ${RFValue(20)}px;
    margin-left: ${ios ? 15 : 15}px;
    margin-bottom: ${ios ? 15 : 15}px;
    margin-top: ${ios ? 20 : 20}px;
`;

export const Scroll = styled.ScrollView.attrs({

    showsVerticalScrollIndicator: false
})`
`;

export const Footer = styled.View`
    height: ${ios ? Height*0.6 : Height*0.6};
    padding-left: ${ios ? 20 : 20}px;
    padding-right: ${ios ? 20 : 20}px;
`;

export const Input = styled.TextInput`
  font-size: ${RFValue(18)}px;
  border-radius: ${ios ? 10 : 10}px;
  border: black 1px solid;
  padding: ${ios ? 20 : 20}px ${ios ? 20 : 20}px;
  width: ${Width*0.9};
  margin-left: ${ios ? 20 : 20}px;
`;