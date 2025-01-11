import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { getExerciseDetails } from '@/lib/appwrite';  

const Description = () => {
  const { exerciseId } = useLocalSearchParams();
  const [exercise, setExercise] = useState<any>(null);
  const router = useRouter();

  console.log("exerciseId:", exerciseId);
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        if (!exerciseId) return; // Ensure exerciseId is available
        const exerciseData = await getExerciseDetails(exerciseId as string);
        setExercise(exerciseData);
      } catch (error) {
        console.log("Error fetching exercise details", error);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  // Ensure player is initialized only when exercise is available
  const player = useVideoPlayer(exercise?.videoUrl, (player) => {
    player.loop = true;
    player.pause();
  });

  const { isPlaying } = player;

  // Early return if exercise is null
  if (!exercise) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Loading Exercise...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center mt-8 px-5">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Ionicons name="arrow-back" size={24} color="#198BEF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800">
          {exercise?.name || 'Loading...'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: 20 }}>
        {/* Video Section */}
        <View className="w-full bg-white rounded-xl overflow-hidden mb-5 shadow-lg">
          <VideoView
            style={{ width: '100%', height: 275 }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>

        {/* Target Muscle Group Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-3">Target Muscle Group</Text>
          <Text className="text-base text-gray-600">
            {exercise?.targetMuscles?.length > 0
              ? exercise?.targetMuscles?.join(', ') // Joining the array into a string with commas
              : 'No target muscles specified'}
          </Text>
        </View>

        {/* Instructions Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-3">Instructions</Text>
          <Text className="text-base text-gray-600">
            {exercise?.instructions || 'No Instructions Available'}
          </Text>
        </View>

        {/* Sets and Reps Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">Sets and Reps</Text>
          <Text className="text-base text-gray-600">
            {`${exercise?.sets}`} Sets x {`${exercise?.reps}`} Reps
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Description;

