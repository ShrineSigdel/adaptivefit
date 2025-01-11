import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import ExerciseCard from '@/components/ExerciseCard';
import dummyImage from '@/assets/images/dummy.png';
import { getExercises } from '@/lib/appwrite';

const Exercises = () => {
  const router = useRouter();

  const exercises = [
    { id: 1, name: 'Push-ups', image: dummyImage },
    { id: 2, name: 'Squats', image: dummyImage },
    { id: 3, name: 'Deadlifts', image: dummyImage },
    { id: 4, name: 'Pull-ups', image: dummyImage },
  ];

  const handleAddToWorkout = (exerciseName: string) => {
    console.log(`${exerciseName} added to your workout!`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 pt-5">
        <View className="flex-row items-center mt-5">
          <Image source={dummyImage} className="w-10 h-10 rounded-full" />
          <View className="ml-3">
            <Text className="text-2xl font-bold text-gray-800 font-robotoMono">
              Welcome Back
            </Text>
            <Text className="text-3xl font-bold text-gray-900 font-robotoMono">
              Nishan
            </Text>
          </View>
        </View>

        <View className="mt-5">
          <SearchBar />
        </View>
      </View>

      <View className="my-5">
        <Text className="text-xl font-bold text-gray-800 pl-5 font-robotoMono">
          Recommended For You
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-5">
        <View className="flex-row flex-wrap justify-between">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name || 'Exercise'} // Handle possible empty name
              image={exercise.image}
              onAddToWorkout={() => handleAddToWorkout(exercise.name)}
              onPress={() => router.push(`/exercise-description/${exercise.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exercises;
