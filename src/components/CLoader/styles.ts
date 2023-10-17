import {StyleSheet} from "react-native";
import styled from "styled-components/native";

export const ContainermodalBackground = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
export const ActivityIndicatorWrapper = styled.View`
    background-color: #FFFFFF;
    height: 100px;
    width: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;