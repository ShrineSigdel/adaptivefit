import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import OnBoardingHeader from '../components/onBoardingHeader';
import { useGlobalContext } from '@/lib/globalProvider';
import { saveUserPreferences } from '@/lib/appwrite';

const Page3: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const {preferences, setUserPreferences} = useGlobalContext(); //get the preferences from global context

    const router = useRouter(); 
    const options = [
        "Yes",
        "No",
        "Sometimes",
    ];

    const handleOptionPress = (option: string) => {
        setSelectedOption(option);
        setUserPreferences('assistanceNeeded', option); //set the first preference
    };

    const handleContinue = () => {
        if (selectedOption) {
            saveUserPreferences(preferences); //save the preferences
            router.push('/(tabs)/exercises'); //redirect to exercises page
        } else {
            alert('Please select an option before continuing.');
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <OnBoardingHeader color1="#198BEF" color2="#198BEF" color3="#198BEF" />
            <Text className="font-bold text-3xl text-center text-[#000000] mt-[20px] mx-10 mb-5">
                Almost there!
            </Text>
            <Text className="font-medium text-xl text-center text-[#000000] mb-5">
                Do you require someone to assist you?
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

export default Page3;
