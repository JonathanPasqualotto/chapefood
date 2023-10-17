import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { ContainermodalBackground, ActivityIndicatorWrapper } from "./styles";

export function CLoader({ isLoading = false }){

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={isLoading}
            style={{ zIndex: 1100 }}
            onRequestClose={() => { }}>
            <ContainermodalBackground>
                <ActivityIndicatorWrapper>
                    <ActivityIndicator animating={isLoading} color="black" />
                </ActivityIndicatorWrapper>
            </ContainermodalBackground>
        </Modal>
    )
}