import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import ExerciseCard from '@/components/MyWorkoutCard';

import dummyImage from '@/assets/images/dummy.png'; 

const MyWorkout = () => {
    const streakIcon = require('../../assets/images/streak.png');

    // Get today's day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const todayIndex = new Date().getDay();

    // Sample workouts data with the same image path included for each workout
    const workouts = [
        { id: 1, name: 'Push-ups', sets: 3, reps: 15, image: dummyImage },
        { id: 2, name: 'Squats', sets: 4, reps: 20, image: dummyImage },
        { id: 3, name: 'Deadlifts', sets: 3, reps: 10, image: dummyImage },
        { id: 4, name: 'Pull-ups', sets: 3, reps: 12, image: dummyImage },
        { id: 5, name: 'Bench Press', sets: 4, reps: 10, image: dummyImage },
        { id: 6, name: 'Leg Press', sets: 3, reps: 15, image: dummyImage },
        { id: 7, name: 'Shoulder Press', sets: 3, reps: 12, image: dummyImage },
    ];

    // Function for handling workout completion
    const handleWorkoutDone = () => {
        // Logic for when workout is done (e.g., marking as complete)
        console.log('Workout is completed!');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="flex-1 bg-white">
                {/* Upper Section */}
                <View className="flex flex-col h-[25%] p-5">
                    <View className="flex-row justify-between items-center pt-10">
                        <Text className="text-[30px] font-poppins font-bold">MY WORKOUTS</Text>
                        <View className="flex-row items-center">
                            <Image source={streakIcon} className="w-8 h-8" />
                            <Text className="font-bold text-[28px]">0</Text>
                        </View>
                    </View>

                    {/* Days of the Week */}
                    <View className="flex flex-row justify-between mt-4">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                            <View
                                key={index}
                                className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-lg ${
                                    index === todayIndex ? 'bg-[#198BEF]' : 'bg-white'
                                }`}
                            >
                                <Text
                                    className={`font-poppins text-[20px] font-bold ${
                                        index === todayIndex ? 'text-white' : 'text-black'
                                    }`}
                                >
                                    {day}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Below Section - List of Workouts */}
                <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-5">
                    {workouts.map((workout) => (
                        <ExerciseCard 
                            key={workout.id} 
                            title={workout.name} 
                            image={workout.image} // Reusing the imported image path
                            sets={workout.sets} 
                            reps={workout.reps} 
                        />
                    ))}

                    {/* "Workout Done" Button Inside ScrollView */}
                    <View className="flex items-center mt-5 mb-10">
                        <TouchableOpacity
                            onPress={handleWorkoutDone}
                            className="bg-[#198BEF] py-3 px-8 rounded-xl"
                        >
                            <Text className="text-white text-[18px] font-bold">Workout Done</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MyWorkout;
