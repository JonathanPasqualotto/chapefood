import React from 'react';
import { Routes } from './src/routes';
import { Container } from "./styles";
import {TouchableOpacityProps} from "react-native";

export default function App() {
//  const [text, onChangeText] = React.useState('');

  return (

      <Routes />

      // <Container>
      //   <Text1>CHAPE FOOD</Text1>
      //   <Text2>BEM VINDO!</Text2>
      //   <TextInput />
      //   <Text style={{fontSize: 20}}>TELA DE TESTE</Text>

      //   <TextInput
      //     style={Input}
      //     onChangeText={onChangeText}
      //     value={text}
      //     placeholder="IMPUT TESTE"
      //     keyboardType='numeric'
      //   />

      //   <StatusBar style="auto" />
      // </Container>
  );
};