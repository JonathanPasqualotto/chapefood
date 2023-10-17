import styled from "styled-components/native";
import {RFValue} from "react-native-responsive-fontsize";
import { Width, Height } from "../../utils/dimensions"
import {Platform} from "react-native";

const ios = Platform.OS === 'ios';

export const LinhaContainer = styled.TouchableOpacity`
    margin-top:  ${ios ? Width*0.15 : Width*0.15};
    background-color: #fff;
    border-radius: ${ios ? 50 : 50}px;
    align-items: center;
    padding: ${ios ? 10 : 10}px;
    width: ${ios ? Width*0.8 : Width*0.8};
    height: ${ios ? Height*0.17 : Height*0.17};
`;

export const Body = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center'
    },
    showsVerticalScrollIndicator: false
})``;

export const Text1 = styled.Text`
  margin-top: ${ios ? Height*0.09 : Height*0.09}px;
  font-size: ${RFValue(20)}px;
`;

export const Text = styled.Text`
  font-size: ${RFValue(18)}px;
`;