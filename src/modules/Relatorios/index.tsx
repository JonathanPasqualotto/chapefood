import React from "react";
import { CCabecalhoHome} from "../../components/CCabecalhoHome";
import {Container, Body, Footer, HeaderModal, Input, Text} from "./styles";
import {CColumn} from "../../components/CColumn";
import {CRow} from "../../components/CRow";
import {CIconButton} from "../../components/CIconButton";
import api from "../../utils/api";
import {useEffect, useState} from "react";
import { Modal, Alert, FlatList } from "react-native";

import {CRelatorio} from "../../components/CRelatorio";
import { CTable } from "../../components/CTable";
import {CSelectList} from "../../components/CSelectList";
import { CButtonRelatorio } from "../../components/CButonRelatorio";

interface IRelatorio{
    status: string
}

enum StatusOptions {
    Aberto = 'Aberto',
    Encerrado = 'Encerrado',
    Todos = 'Todos',
}

export function SRelatorios() {
    const [ relatorios, setRelatorios ] = useState([])
    const [ selected, setSelected ] = useState('')
    const [selectStatus, setSelectStatus] = useState<StatusOptions[]>([
        StatusOptions.Aberto,
        StatusOptions.Encerrado,
        StatusOptions.Todos,
    ]);

    var filtro =  '';

    if (selected != '') {
        filtro = '?status='+selected;
    }

    function gerarRelatorio() {
        api.get('/pedidos/relatorio' + filtro)
            .then((response) => {
                setRelatorios(response.data);
            })
            .catch(error => {
                console.warn(error);
            });
    }
    
    return (
        <Container>
            <CCabecalhoHome title="Relatórios" />
            <Body>
                <CSelectList
                    setSelected={(val: string) => setSelected(val)}
                    data={selectStatus}
                    save="key"
                    onSelect={() => selected}
                    label="Cargo"
                    searchPlaceholder="Pesquisar"
                />
                <CRelatorio registros={relatorios} />
                <CButtonRelatorio onPress={gerarRelatorio} title="Carregar relatório" />
            </Body>
        </Container>
    );
}