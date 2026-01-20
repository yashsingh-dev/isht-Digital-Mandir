import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../utils/i18n';

const MusicScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{i18n.t('music')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default MusicScreen;
