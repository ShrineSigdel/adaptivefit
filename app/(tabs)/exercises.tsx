import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import ExerciseCard from '@/components/ExerciseCard';
import dummyImage from '@/assets/images/dummy.png';
import { getExercises, createWorkout, addExerciseToWorkout, getMyWorkout, getWorkoutId } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/globalProvider';

const Exercises = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refresh control
  const { preferences, user } = useGlobalContext(); // Get user and preferences from global context
  const router = useRouter();

  // Function to fetch exercises
  const fetchExercises = async () => {
    try {
      const response = await getExercises(preferences.impairementType, preferences.impairementLevel);
      setExercises(response);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setRefreshing(false); // Stop refreshing after data is fetched
    }
  };

  // Trigger refresh when user pulls down
  const onRefresh = () => {
    setRefreshing(true);
    fetchExercises();
  };

  useEffect(() => {
    fetchExercises(); // Fetch exercises initially
  }, [preferences]);

  const handleAddToWorkout = async (exerciseId: string) => {
    try {
      if (!user || !user.$id) {
        console.error('User ID is undefined');
        return;
      }

      let workoutId = await getWorkoutId(user.$id);

      // Create a new workout if one doesn't exist
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

      // Fetch the current workout to check for duplicates
      const currentWorkout = await getMyWorkout(user.$id);

      const isExerciseInWorkout = currentWorkout.some(
        (workout) =>
          workout.$id === workoutId &&
          workout.exercises.some((exercise: any) => exercise.$id === exerciseId)
      );

      if (isExerciseInWorkout) {
        console.log(`Exercise ${exerciseId} is already in the workout.`);
        return;
      }

      console.log(`Adding exercise (${exerciseId}) to workout (${workoutId})...`);
      const result = await addExerciseToWorkout(workoutId, exerciseId);
      if (result) {
        console.log(`${exerciseId} successfully added to your workout!`);
      } else {
        console.error(`Failed to add ${exerciseId} to workout`);
      }
    } catch (error) {
      console.error('Error adding exercise to the workout:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 pt-5">
        <View className="flex-row items-center mt-5">
          <Image source={dummyImage} className="w-10 h-10 rounded-full" />
          <View className="ml-3">
            <Text className="text-2xl font-bold text-gray-800 font-robotoMono">Welcome Back</Text>
            <Text className="text-3xl font-bold text-gray-900 font-robotoMono">
              {user?.name ?? 'Guest'}
            </Text>
          </View>
        </View>
        <View className="mt-5">
          <SearchBar />
        </View>
      </View>
      <View className="my-5">
        <Text className="text-xl font-bold text-gray-800 pl-5 font-robotoMono">Recommended For You</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-5"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="flex-row flex-wrap justify-between">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.$id}
              name={exercise.name || 'Exercise'}
              image={exercise.thumbnail ? { uri: exercise.thumbnail } : dummyImage}
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
