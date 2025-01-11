import React from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/globalProvider';
import { Redirect } from 'expo-router';

const LoginScreen = () => {
    const { refetchUser, loading, isLogged } = useGlobalContext();
    const background = require('../assets/images/hero2.jpeg');
    const googleIcon = require('../assets/images/google.png'); // Google Icon

    if (!loading && isLogged) return <Redirect href="/(tabs)/exercises" />;

    const handleLogin = async () => {
        try {
            const result = await login();
            if (result) {
                await refetchUser();
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to login');
        }
    };

    return (
        <SafeAreaView className="flex-1">
            {/* Background Image */}
            <Image
                source={background}
                className="absolute w-full h-full"
                style={{ opacity: 0.3 }} // Dim background for better readability
            />
            {/* Main Content */}
            <View className="flex-1 items-center justify-center px-8">
                {/* Header */}
                <View className="mb-10">
                    <Text className="text-center text-4xl font-black mt-2">
                        A D A P T I V E   F I T
                    </Text>

                    {/* Slogan */}
                    <Text className="text-center text-xl font-semibold">
                        Move beyond barriers
                    </Text>
                </View>

                {/* Additional Text */}
                <Text className="text-center text-lg font-normal mt-4">
                    Discover tailored workouts, personalized guidance, and a community that celebrates every step of your fitness journey.
                </Text>

                {/* Login Button using TouchableOpacity */}
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        width: '80%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#070D81', // Updated background color to match the theme
                        borderRadius: 30,
                        paddingVertical: 12,
                        marginTop: 20, // Add some spacing from the text
                        elevation: 4, // Adding shadow for better visibility on different backgrounds
                    }}
                >
                    <Image
                        source={googleIcon}
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 10, // Adjust the space between icon and text
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                        }}
                    >
                        Login with Google
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="absolute bottom-6 w-full items-center">
                <Text className="text-center text-sm text-gray-500">
                    By continuing, you agree to our{' '}
                    <Text className="text-[#198BEF] font-semibold">Terms & Conditions</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
