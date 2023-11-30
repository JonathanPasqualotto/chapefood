import React from "react";
import { CCabecalhoHome} from "../../components/CCabecalhoHome";
import {Container, Body, Footer } from "./styles";
import api from "../../utils/api";
import {useState} from "react";
import {View, StyleSheet} from "react-native";
import {CRelatorio, iRegistros} from "../../components/CRelatorio";
import {CSelectList} from "../../components/CSelectList";
import { CButtonRelatorio } from "../../components/CButonRelatorio";

interface IRelatorio{
    status: string
}

export enum StatusOptions {
    Aberto = 'Aberto',
    Encerrado = 'Encerrado',
    Todos = 'Todos',
}

export type StatusType = {
    val: string;   
}

export function SRelatorios() {
    const [ relatorios, setRelatorios ] = useState<iRegistros>()
    const [ selected, setSelected ] = useState<StatusType | string>('');
    const [selectStatus, setSelectStatus] = useState<StatusOptions[]>([
        StatusOptions.Aberto,
        StatusOptions.Encerrado,
        StatusOptions.Todos,
    ]);

    var filtro =  '';
    
    if (selected != 'Todos') {
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
        <>
            <CCabecalhoHome title="Relatórios" />
            <View style={styles.container}>
                    <View>
                        <CSelectList
                            setSelected={(val:StatusType) => setSelected(val)}
                            data={selectStatus}
                            save="key"
                            onSelect={() => selected}
                            label="Cargo"
                            searchPlaceholder="Pesquisar"
                        />
                    </View>
                <CRelatorio registros={relatorios}  />
                <CButtonRelatorio onPress={gerarRelatorio} title="Carregar" />
                
            </View>
        </>
        
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1e1f22'
    },

})