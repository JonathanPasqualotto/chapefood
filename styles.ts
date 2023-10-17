import styled from "styled-components/native"

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #94A684;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const Text1 = styled.Text`
    font-size: 40px;
    color: #E55604;
    font-weight: bold;
`;

export const Text2 = styled.Text`
    font-size: 60px;
    color: green;
    font-weight: bold;
`;

export const Header = styled.View`
    background-color: #6DA9E4;
    height: 150px;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
`;

export const Body = styled.ScrollView.attrs({
    contentContainerStyle: {
        alignItems: 'center'
    },
    showsVerticalScrollIndicator: false
})``;

export const Input = styled.TextInput`
    font-size: 20px;
    height: 15px;
    width: 20%;
    padding: 0 15px;
`;

export const Logo = styled.Image`
  width: 100%;
  background-repeat: no-repeat;
  height: 50%;
  align-items: center;
  justify-items: center;
  border-radius: 50px;
  background-color: transparent;
`;