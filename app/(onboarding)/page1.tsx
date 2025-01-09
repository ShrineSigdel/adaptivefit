import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Page1: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Onboarding Page 1</Text>
            <Text style={styles.paragraph}>This is the first step of the onboarding process.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Page1;