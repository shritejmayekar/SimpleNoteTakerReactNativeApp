import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-ionicons';
import { Ionicons } from '@expo/vector-icons';


export function IconButton({ name, style, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>

            <Ionicons name={name} color={'black'} size={32} />

        </TouchableOpacity>

    );


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',

        borderRadius: 10,
        height: 40,
        width: 40,
        alignItems: 'center'
    },

});
