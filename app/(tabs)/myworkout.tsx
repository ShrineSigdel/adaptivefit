import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';  
import dummyImage from '@/assets/images/dummy.png';
import MyWorkoutCard from '@/components/MyWorkoutCard';

const MyWorkout = () => {
  const router = useRouter();  
  const streakIcon = require('../../assets/images/streak.png');

  const todayIndex = new Date().getDay();
  
  const workouts = [
    { id: 1, name: 'Push-ups', sets: 3, reps: 15, image: dummyImage },
    { id: 2, name: 'Squats', sets: 4, reps: 20, image: dummyImage },
    { id: 3, name: 'Deadlifts', sets: 3, reps: 10, image: dummyImage },
    { id: 4, name: 'Pull-ups', sets: 3, reps: 12, image: dummyImage },
    { id: 5, name: 'Bench Press', sets: 4, reps: 10, image: dummyImage },
    { id: 6, name: 'Leg Press', sets: 3, reps: 15, image: dummyImage },
    { id: 7, name: 'Shoulder Press', sets: 3, reps: 12, image: dummyImage },
  ];

  // Handle Workout Completion
  const handleWorkoutDone = () => {
    console.log('Workout is completed!');
  };

  // Handle removing an exercise (optional)
  const handleRemoveExercise = (id: number) => {
    console.log(`Exercise with id ${id} removed.`);
  };

  // Handle marking the exercise as completed
  const handleMarkComplete = (id: number) => {
    console.log(`Exercise with id ${id} marked as completed.`);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white flex-1">
        {/* Upper Section */}
        <View className="flex flex-col h-[25%] px-5 pt-2">
          <View className="flex-row justify-between items-center pt-10">
            <Text className="text-[30px] font-poppins font-bold">My Workouts</Text>
            <View className="flex-row items-center">
              <Image source={streakIcon} className="w-8 h-8" />
              <Text className="font-bold text-[28px]">{'0'}</Text>
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
          <View className="flex items-center">
            {workouts.map((workout) => (
              <MyWorkoutCard
                key={workout.id}
                title={workout.name}
                image={workout.image}
                sets={workout.sets}
                reps={workout.reps}
                onPress={() => router.push(`/exercise-description/${workout.id}`)}
                onRemove={() => handleRemoveExercise(workout.id)}
                onMarkComplete={() => handleMarkComplete(workout.id)}
              />
            ))}
          </View>

          {/* "Workout Done" Button */}
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
