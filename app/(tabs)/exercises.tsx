import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import ExerciseCard from '@/components/ExerciseCard';
import dummyImage from '@/assets/images/dummy.png';
import { getExercises } from '@/lib/appwrite';
import { createWorkout, addExerciseToWorkout, getWorkoutId } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/globalProvider';


const Exercises = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const { preferences } = useGlobalContext(); //get the user preferences
  const { user } = useGlobalContext(); //get the user from global context
  const router = useRouter();

  useEffect(() => {
    const fetchExercises = async () => {
      console.log("prefernces from exercises:", preferences);
      const response = await getExercises(preferences.impairementType, preferences.impairementLevel);
      setExercises(response);
    };
    fetchExercises();
  }, []);

  const handleAddToWorkout = async (exerciseId: string) => {
    try {
      // Ensure user exists
      if (!user || !user.$id) {
        console.error('User ID is undefined');
        return;
      }

      // Retrieve workout ID for the user
      let workoutId: string | null = await getWorkoutId(user.$id);

      // If no workout exists, create one
      if (!workoutId) {
        console.log('No workout found. Creating a new workout...');
        const newWorkout = await createWorkout(user.$id, exerciseId);
        if (newWorkout && newWorkout.$id) {
          workoutId = newWorkout.$id;
          console.log('New workout created:', workoutId);
        } else {
          console.error('Failed to create a new workout');
          return;
        }
      }

      // Ensure workout ID is valid
      if (!workoutId) {
        console.error('Workout ID is null or undefined');
        return;
      }

      // Add the exercise to the workout
      console.log(`Adding exercise (${exerciseId}) to workout (${workoutId})...`);
      const result = await addExerciseToWorkout(workoutId, exerciseId);
      if (result) {
        console.log(`${exerciseId} successfully added to your workout!`);
      } else {
        console.error(`Failed to add ${exerciseId} to workout`);
      }
    } catch (error) {
      console.error('An error occurred while adding the exercise to the workout:', error);
    }
  };




  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 pt-5">
        {/* Header */}
        <View className="flex-row items-center mt-5">
          <Image source={dummyImage} className="w-10 h-10 rounded-full" />
          <View className="ml-3">
            <Text className="text-2xl font-bold text-gray-800 font-robotoMono">
              Welcome Back
            </Text>
            <Text className="text-3xl font-bold text-gray-900 font-robotoMono">
              {user?.name ?? 'Guest'}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="mt-5">
          <SearchBar />
        </View>
      </View>

      {/* Section Title */}
      <View className="my-5">
        <Text className="text-xl font-bold text-gray-800 pl-5 font-robotoMono">
          Recommended For You
        </Text>
      </View>

      {/* Exercise Cards */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-5">
        <View className="flex-row flex-wrap justify-between">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.$id}
              name={exercise.name || 'Exercise'} // Handle possible empty name
              image={exercise.thumbnail ? { uri: exercise.thumbnail } : dummyImage} // Provide a fallback image
              onAddToWorkout={() => handleAddToWorkout(exercise.$id)}
              onPress={() => router.push(`/exercise-description/${exercise.$id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exercises;
