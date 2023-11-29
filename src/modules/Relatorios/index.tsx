import React from "react";
import { CCabecalhoHome} from "../../components/CCabecalhoHome";
import {Container, Body, Footer } from "./styles";
import api from "../../utils/api";
import { useState} from "react";
import { Modal, Alert, FlatList } from "react-native";
import {CRelatorio} from "../../components/CRelatorio";
import {CSelectList} from "../../components/CSelectList";
import { CButtonRelatorio } from "../../components/CButonRelatorio";

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
                setSelected('')
            })
            .catch(error => {
                console.warn(error);
            });
    }
    
    return (
        <Container>
            <CCabecalhoHome title="Relatório" />

            <CSelectList
                setSelected={(val: string) => setSelected(val)}
                data={selectStatus}
                save="key"
                onSelect={() => selected}
                label="Cargo"
                searchPlaceholder="Pesquisar"
            />
            <Body>
                <CRelatorio registros={relatorios} />
            </Body>
            <Footer>
                <CButtonRelatorio onPress={gerarRelatorio} title="Carregar relatório" />
            </Footer>
        </Container>
    );
}