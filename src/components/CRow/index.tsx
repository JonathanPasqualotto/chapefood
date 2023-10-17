import React from 'react';
import {Container} from './styles';
import { ViewProps } from 'react-native';

interface Props extends ViewProps{
    children?: React.ReactNode;
    align?: 'left' | 'center' | 'right';
    justify?: 'center';
}

export function CRow({ children, ...rest } : Props){
    return (
        <Container {...rest}>
            {children}
        </Container>
    );
}