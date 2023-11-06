import React from 'react';
import { Container } from './styles';

interface Props {
    align?: 'left' | 'center' | 'right';
    justify?: 'center';
    children: any;
    marginRight?: number;
    marginTop?: number;
    marginLeft?: number;
}

export function CColumn({ children, ...rest } : Props){
    return (
        <Container {...rest}>
            {children}
        </Container>
    );
}