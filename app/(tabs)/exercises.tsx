import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/SearchBar';
import ExerciseCard from '@/components/ExerciseCard';
import dummyImage from '@/assets/images/dummy.png';
import { getExercises } from '@/lib/appwrite';

const Exercises = () => {

  const appExercies = getExercises();
  console.log(appExercies);
  // Dummy data for exercises
  const exercises = [
    { id: 1, name: 'Push-ups', image: dummyImage },
    { id: 2, name: 'Squats', image: dummyImage },
    { id: 3, name: 'Deadlifts', image: dummyImage },
    { id: 4, name: 'Pull-ups', image: dummyImage },
    { id: 5, name: 'Bench Press', image: dummyImage },
    { id: 6, name: 'Leg Press', image: dummyImage },
    { id: 7, name: 'Shoulder Press', image: dummyImage },
    { id: 8, name: 'Lunges', image: dummyImage },
  ];

  const handleAddToWorkout = (exerciseName: string) => {
    console.log(`${exerciseName} added to your workout!`);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        {/* Avatar and Name */}
        <View className="flex-row items-center mt-5">
          <Image source={dummyImage} className="size-14 rounded-full" />
          <View className="flex flex-col items-start ml-2 justify-center">
            <Text className="text-lg font-poppins text-black-100 font-semibold">Welcome Back</Text>
            <Text className="text-2xl font-poppins text-black-300 font-bold">Nishan</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mt-5">
          <SearchBar />
        </View>
      </View>

      {/* Section Title */}
      <View className="my-5">
        <Text className="text-xl font-poppins text-black-300 mt-2 pl-7 font-bold">
          Recommended For You
        </Text>
      </View>

      {/* Exercise Cards Gallery */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
        <View className="flex-row flex-wrap justify-between">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              image={exercise.image}
              onAddToWorkout={() => handleAddToWorkout(exercise.name)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exercises;
