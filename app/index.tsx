import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to AdaptiveFit!</Text>
            <Text style={styles.subtitle}>Your personalized fitness journey starts here.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
    },
});

export default WelcomeScreen;