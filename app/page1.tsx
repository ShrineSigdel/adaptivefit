import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import OnBoardingHeader from '@/components/onBoardingHeader';
import { useGlobalContext } from '@/lib/globalProvider';

const Page1: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track selected option
    const [expandedOption, setExpandedOption] = useState<string | null>(null); // Track expanded option for dropdown
    const {preferences, setUserPreferences} = useGlobalContext(); //get the preferences from global context
    const heroImage = require('../assets/images/hero1.png');
    const router = useRouter();

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#198BEF',
            secondary: '#070D81',
            text: '#000000',
            background: '#FFFFFF',
        },
    };

    const options = [
        { title: 'Upper limb - Prothesesis', subOptions: ['Single', 'Double'] },
        { title: 'Lower limb - Prothesesis', subOptions: ['Single', 'Double'] },
        { title: 'Upper limb - Amputee', subOptions: ['Single', 'Double'] },
        { title: 'Lower limb - Amputee', subOptions: ['Single', 'Double'] },
    ];

    const handleOptionPress = (option: string) => {
        setExpandedOption(expandedOption === option ? null : option); // Toggle expanded state
        setUserPreferences('impairementType', option); //set the first preference 
    };

    const handleSubOptionPress = (subOption: string) => {
        setSelectedOption(subOption); // Set selected sub-option
        setUserPreferences('impairementLevel', subOption); //set the second preference
    };

    const handleContinue = () => {
        if (selectedOption) {
            router.push('/page2'); // Proceed if an option is selected
        } else {
            Alert.alert('Selection Required', 'Please select a sub-option to continue.');
        }
    };

    return (
        <PaperProvider theme={theme}>
            <ScrollView className="flex flex-col content-center h-full bg-white mb-4">
                <OnBoardingHeader color1="#198BEF" color2="#D9D9D9" color3="#D9D9D9" />
                <View className="flex-col justify-around content-center h-52 px-4">
                    <Text className="font-bold text-3xl text-center">Hi There!</Text>
                    <Text className="font-light text-lg text-center">
                        Tell us about yourself, to help us build your profile
                    </Text>
                    <Text className="font-bold text-xl text-center">
                        Tell us which best describes your impairment(s)
                    </Text>
                </View>
                <Image source={heroImage} contentFit="cover" className="h-[220px] w-auto" />
                <View>
                    {options.map((option, index) => (
                        <View key={index} className="mx-5 my-2">
                            {/* Main Option */}
                            <TouchableOpacity
                                onPress={() => handleOptionPress(option.title)}
                                className={`flex flex-row items-center justify-between p-4 border-2 rounded-[20px] ${
                                    expandedOption === option.title ? 'border-[#198BEF]' : 'border-[#D9D9D9]'
                                }`}
                            >
                                <Text
                                    className={`text-lg font-bold ${
                                        expandedOption === option.title ? 'text-[#198BEF]' : 'text-black'
                                    }`}
                                >
                                    {option.title}
                                </Text>
                                <Text
                                    className={`text-lg font-semibold ${
                                        expandedOption === option.title ? 'text-[#198BEF]' : 'text-black'
                                    }`}
                                >
                                    {expandedOption === option.title ? '-' : '+'}
                                </Text>
                            </TouchableOpacity>
                            {/* Sub-Options */}
                            {expandedOption === option.title && (
                                <View className="mt-2">
                                    {option.subOptions.map((subOption, subIndex) => (
                                        <TouchableOpacity
                                            key={subIndex}
                                            onPress={() => handleSubOptionPress(subOption)}
                                            className={`flex flex-row items-center justify-center p-3 mx-2 border-2 rounded-[20px] ${
                                                selectedOption === subOption
                                                    ? 'border-[#198BEF] bg-[#E6F4FF]'
                                                    : 'border-[#D9D9D9] bg-[#F9FAFB]'
                                            }`}
                                        >
                                            <Text
                                                className={`text-lg ${
                                                    selectedOption === subOption ? 'text-[#198BEF]' : 'text-black'
                                                }`}
                                            >
                                                {subOption}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
                <View className="flex flex-col items-center justify-center">
                    <TouchableOpacity
                        onPress={handleContinue}
                        className="flex flex-col items-center justify-center p-4 h-[50px] w-[200px] mt-5 bg-[#198BEF] rounded-[20px]"
                    >
                        <Text className="text-base text-center text-white text-[20px] font-semibold">
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

export default Page1;
