import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import MyWorkoutCard from '@/components/MyWorkoutCard';
import { getMyWorkout } from '@/lib/appwrite';
import dummyImage from '@/assets/images/dummy.png'
import { useGlobalContext } from '@/lib/globalProvider';

const MyWorkout = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const router = useRouter();
  const streakIcon = require('../../assets/images/streak.png');
  const { user } = useGlobalContext();

  const todayIndex = new Date().getDay();

  // Fetch workouts on mount
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userId = user?.$id; // Replace with the authenticated userId
        if (userId) {
          const fetchedWorkouts = await getMyWorkout(userId);
          setWorkouts(fetchedWorkouts);
        } else {
          console.error("User ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  // Handle marking workout as completed
  const handleWorkoutDone = () => {
    console.log('Workout completed!');
  };

  // Handle removing an exercise (optional, can implement update logic)
  const handleRemoveExercise = (workoutId: string, exerciseId: string) => {
    console.log(`Removing exercise ${exerciseId} from workout ${workoutId}`);
  };

  // Handle marking an exercise as completed
  const handleMarkComplete = (exerciseId: string) => {
    console.log(`Exercise ${exerciseId} marked as completed.`);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white flex-1">
        {/* Header Section */}
        <View className="flex flex-col h-[25%] px-5 pt-2">
          <View className="flex-row justify-between items-center pt-10">
            <Text className="text-[30px] font-poppins font-bold">My Workouts</Text>
            <View className="flex-row items-center">
              <Image source={streakIcon} className="w-8 h-8" />
              <Text className="font-bold text-[28px]">{workouts.length}</Text>
            </View>
          </View>

          {/* Days of the Week */}
          <View className="flex flex-row justify-between mt-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <View
                key={index}
                className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-lg ${index === todayIndex ? 'bg-[#198BEF]' : 'bg-white'
                  }`}
              >
                <Text
                  className={`font-poppins text-[20px] font-bold ${index === todayIndex ? 'text-white' : 'text-black'
                    }`}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Workouts Section */}
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-5">
          <View className="flex items-center">
            {workouts.map((workout) => (
              <View key={workout.$id} className="w-full">
                {/* Workout Card */}
                <Text className="font-poppins font-bold text-lg">{`Workout ${workout.$id}`}</Text>
                {workout.exercises.map((exercise: any) => (
                  <MyWorkoutCard
                    key={exercise.$id}
                    title={exercise.name} // Use exercise name
                    image={exercise.thumbnail ? { uri: exercise.thumbnail } : dummyImage}// Use exercise image
                    sets={exercise.sets || 0} // Use exercise sets
                    reps={exercise.reps || 0} // Use exercise reps
                    onPress={() => router.push(`/exercise-description/${exercise.$id}`)}
                    onRemove={() => handleRemoveExercise(workout.$id, exercise.$id)}
                    onMarkComplete={() => handleMarkComplete(exercise.$id)}
                  />
                ))}
              </View>
            ))}
          </View>

          {/* Workout Done Button */}
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
