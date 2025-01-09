import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';

const WelcomeScreen = () => {
    return (
        <View className='bg-red-700'>
            <Text style={styles.title}>Welcome to AdaptiveFit!</Text>
            <Text style={styles.subtitle}>Your personalized fitness journey starts here.</Text>
            <Link href="/login">Login</Link>
            <Link href="/page1">Onboarding Page 1</Link>
            <Link href="/page2">Onboarding Page 2</Link>
            <Link href="/page3">Onboarding Page 3</Link>

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