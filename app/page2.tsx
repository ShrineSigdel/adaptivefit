import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import OnBoardingHeader from '../components/onBoardingHeader';

const Page2: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const router = useRouter(); 
    const options = [
        "Exercise 5+ times a week",
        "Exercise 3-4 times a week",
        "Exercise 1-2 times a week",
        "I am new to this",
    ];

    const handleOptionPress = (option: string) => {
        setSelectedOption(option);
    };

    const handleContinue = () => {
        if (selectedOption) {
            router.push('/page3'); 
        } else {
            alert('Please select an option before continuing.');
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <OnBoardingHeader color1="#198BEF" color2="#198BEF" color3="#D9D9D9" />
            <Text className="font-bold text-3xl text-center text-[#000000] mt-[20px] mx-10 mb-5">
                Which best describes your current exercise routine?
            </Text>
            <View>
                {options.map((option, index) => {
                    const isSelected = selectedOption === option;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionPress(option)}
                            className={`flex flex-col items-center justify-center p-5 h-20 mx-10 mb-5 border-2 rounded-[20px] ${
                                isSelected ? 'border-[#198BEF]' : 'border-[#D9D9D9]'
                            }`}
                        >
                            <Text className="text-[16px] font-semibold text-[#000000]">
                                {option}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
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
        </SafeAreaView>
    );
};

export default Page2;
