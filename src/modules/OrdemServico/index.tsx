import React from "react";
import {Container} from "./styles";
import {CCabecalhoHome} from "../../components/CCabecalhoHome";
import ListagemOrdemServico from "./ListagemOrdemServico";

export function SOrdemServico(){
    return(
        <Container>
            <CCabecalhoHome title="Ordem de Serviço"/>
            <ListagemOrdemServico />
        </Container>
    )
}