import React from "react";
import { CCabecalhoHome} from "../../components/CCabecalhoHome";
import {Container, Footer, HeaderModal, Input, Text} from "./styles";
import {CColumn} from "../../components/CColumn";
import {CRow} from "../../components/CRow";
import {CIconButton} from "../../components/CIconButton";
import api from "../../utils/api";
import {useEffect, useState} from "react";
import { Modal, Alert, FlatList } from "react-native";
import {CButton} from "../../components/CButton";


interface IRelatorio{
    status: string
}

export function SRelatorios() {
    const [ relatorios, setRelatorios ] = useState([])

    useEffect(() => {
        api.get('/')
            .then(response=>{
                setRelatorios(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [relatorios]);

    return (
        <Container>
            
        </Container>
    )
}