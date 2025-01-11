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

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        if (!exerciseId) return; // Ensure exerciseId is available
        const exerciseData = await getExerciseDetails(exerciseId as string);
        setExercise(exerciseData);
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  // Initialize the video player when the exercise is loaded
  const player = useVideoPlayer(exercise?.videourl, (player) => {
    player.loop = true;
    player.pause();
  });

  // Early return while data is loading
  if (!exercise) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text>Loading Exercise...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center mt-8 px-5">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Ionicons name="arrow-back" size={24} color="#198BEF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800">
          {exercise.name || 'Exercise'}
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
            {exercise.target?.length > 0
              ? exercise.target.join(', ') // Joining array into a string
              : 'No target muscles specified'}
          </Text>
        </View>

        {/* Instructions Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-3">Instructions</Text>
          <Text className="text-base text-gray-600">
            {exercise.instructions || 'No Instructions Available'}
          </Text>
        </View>

        {/* Sets and Reps Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-3">Sets and Reps</Text>
          <Text className="text-base text-gray-600">
            {exercise.sets ? `${exercise.sets} Sets` : 'N/A'} x{' '}
            {exercise.reps ? `${exercise.reps} Reps` : 'N/A'}
          </Text>
        </View>

        {/* Source Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">Source</Text>
          <Text className="text-base text-blue-600">
            {exercise.source || 'No source available'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Description;
