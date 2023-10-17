import React from 'react';
import { Container } from './styles';

interface Props {
    align?: 'left' | 'center' | 'right';
    justify?: 'center';
    children: any;
    cols?: number;
}

export function CColumn({ children, cols, ...rest } : Props){
    return (
        <Container {...rest}>
            {children}
        </Container>
    );
}