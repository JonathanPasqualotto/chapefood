import styled from "styled-components/native"
import {RFValue} from "react-native-responsive-fontsize";
import { Width, Height } from "../../utils/dimensions"
import {Platform} from "react-native";

const ios = Platform.OS === 'ios';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #1e1f22;
`;

export const Header = styled.View`
    background-color: #159322;
    padding-left: ${ios ? 25 : 25}px;
    padding-top: ${ios ? 25 : 25}px;
    padding-bottom: ${ios ? 20 : 20}px;
`;

export const Body = styled.ScrollView.attrs({
    contentContainerStyle: {
         alignItems: 'center',
    },
    showsVerticalScrollIndicator: false
})``;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  font-weight: bold;
  color: #fff;
`;

export const MenuGrid = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${ios ? 30 : 30}px ${ios ? 40 : 40}px;
  flex-wrap: wrap;
  background-color: #1e1f22;
`;

export const MenuItem = styled.TouchableOpacity`
  height: ${ios ? Height*0.23 : Height*0.23};
  min-width: ${ios ? Height*0.15 : Height*0.15}px;
  margin: ${ios ? 10 : 10}px;
  border-radius: ${ios ? 20 : 20}px;
  padding: ${ios ? 10 : 10}px ${ios ? 30 : 30}px;
  background-color: #98E4FF;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #28461c;
  font-weight: bold;
  text-align: center;
`;