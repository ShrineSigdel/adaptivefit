import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import MyWorkoutCard from '@/components/MyWorkoutCard';
import { getMyWorkout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/globalProvider';

const MyWorkout = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const streakIcon = require('../../assets/images/streak.png');
  const { user } = useGlobalContext();

  const todayIndex = new Date().getDay();

  // Function to fetch workouts
  const fetchWorkouts = async () => {
    try {
      const userId = user?.$id;
      if (userId) {
        const fetchedWorkouts = await getMyWorkout(userId);
        setWorkouts(fetchedWorkouts);
      } else {
        console.error('User ID is undefined');
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false); // Stop refreshing after data is fetched
    }
  };

  // Trigger the refresh when user pulls down
  const onRefresh = () => {
    setRefreshing(true);
    fetchWorkouts();
  };

  useEffect(() => {
    fetchWorkouts();
  }, [user]);

  const handleRemoveExercise = (workoutId: string, exerciseId: string) => {
    console.log(`Removing exercise ${exerciseId} from workout ${workoutId}`);
  };

  const handleMarkComplete = (exerciseId: string) => {
    console.log(`Exercise ${exerciseId} marked as completed.`);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white flex-1">
        <View className="flex flex-col h-[25%] px-5 pt-2">
          <View className="flex-row justify-between items-center pt-10">
            <Text className="text-[30px] font-poppins font-bold">My Workouts</Text>
            <View className="flex-row items-center">
              <Image source={streakIcon} className="w-8 h-8" />
              <Text className="font-bold text-[28px]">{workouts.length}</Text>
            </View>
          </View>
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

        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#198BEF" />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 80 }}
            className="px-5"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View className="flex items-center justify-center">
              {workouts.map((workout) => (
                <View key={workout.$id} className="w-full flex items-center justify-center">
                  {workout.exercises.map((exercise: any) => (
                    <MyWorkoutCard
                      key={exercise.$id}
                      title={exercise.name}
                      image={exercise.thumbnail ? { uri: exercise.thumbnail } : dummyImage}
                      sets={exercise.sets || 0}
                      reps={exercise.reps || 0}
                      onPress={() => router.push(`/exercise-description/${exercise.$id}`)}
                      onRemove={() => handleRemoveExercise(workout.$id, exercise.$id)}
                      onMarkComplete={() => handleMarkComplete(exercise.$id)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyWorkout;
