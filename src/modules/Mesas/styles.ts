import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Width, Height } from "../../utils/dimensions"
import { Platform } from "react-native";

const ios = Platform.OS === 'ios';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1e1f22;
`;

export const Body = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center'
    },
    showsVerticalScrollIndicator: false
})``;

export const Text = styled.Text`
  font-size: ${RFValue(25)}px;
  color: white;
  font-weight: bold;
`;

export const TextCad = styled.Text`
  font-size: ${RFValue(20)}px;
  color: white;
  font-weight: bold;
  margin-top: 10px;
`;

export const HeaderModal = styled.View`
  background-color: #757779;
  width: ${ios ? Width*0.9 : Width*0.8 }px;
  height: ${ios ? Height*0.8 : Height*0.8 }px;
  padding: ${ios ? 15 : 10}px ${ios ? 20 : 28}px;
  margin: ${ios ? 40 : 60}px ${ios ? 50 : 50}px;
  border-radius: ${ios ? 30 : 30}px;
`;

export const Input = styled.TextInput`
  font-size: ${RFValue(15)}px;
  margin-top: ${ios ? 15 : 15}px;
  padding: ${ios ? 15 : 15}px ${ios ? 20 : 20}px;
  border: black 1px solid;
  border-radius: ${ios ? 20 : 20}px;
  width: ${ios ? Width*0.8 : Width*0.7 };
  background-color: white;
`;

export const Footer = styled.View`
  align-items: flex-end;
  justify-content: right;
  padding-right: ${ios ? 20 : 20}px;
`;

export const Coluna = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;