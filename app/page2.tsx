import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnBoardingHeader from '../components/onBoardingHeader';

const Page2: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const options = [
        "Exercise 5+ times a week",
        "Exercise 3-4 times a week",
        "Exercise 1-2 times a week",
        "I am new to this",
    ];

    const handleOptionPress = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <OnBoardingHeader color1="#198BEF" color2="#198BEF" color3="#D9D9D9" />
            <Text className="text-base text-center text-[22px] font-bold mt-[20px] mx-10 mb-[200px]">
                Which best describes your current workout habits?
            </Text>
            <View>
                {options.map((option, index) => {
                    const isSelected = selectedOption === option;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleOptionPress(option)}
                            className={`flex flex-col items-center justify-center p-4 h-20 mx-10 mb-5 border-2 rounded-[20px] ${
                                isSelected ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        >
                            <Text className = 'text-[20px] font-semibold'>
                                {option}name
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View className='flex flex-col items-center justify-center'>
                <TouchableOpacity className='flex flex-col items-center justify-center p-4 h-[50px] w-[200px] mt-5 bg-[#198BEF] rounded-[20px]'>
                    <Text className = 'text-base text-center text-[20px] font-semibold'>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Page2;
