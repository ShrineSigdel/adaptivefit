import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';

const Description = () => {
  const { exerciseId } = useLocalSearchParams();
  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const router = useRouter();

  const exercises = [
    { id: 1, name: 'Push-ups' },
    { id: 2, name: 'Squats' },
    { id: 3, name: 'Deadlifts' },
    { id: 4, name: 'Pull-ups' },
  ];

  useEffect(() => {
    const exercise = exercises.find(exercise => exercise.id === Number(exerciseId));
    if (exercise) {
      setExerciseName(exercise.name);
    }
  }, [exerciseId]);

  const videoSource = require('../../assets/Videos/pushup.mp4');

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.pause();
  });

  const { isPlaying } = player;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center mt-8 px-5">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Ionicons name="arrow-back" size={24} color="#198BEF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800">
          {exerciseName || 'Loading...'}
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
            Chest, Triceps, Shoulders
          </Text>
        </View>

        {/* Instructions Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-3">Instructions</Text>
          <Text className="text-base text-gray-600">
            1. Start by placing your hands shoulder-width apart on the floor.
            {'\n'}
            2. Lower your body towards the floor by bending your elbows.
            {'\n'}
            3. Push yourself back up to the starting position.
            {'\n'}
            4. Repeat for the desired number of reps.
          </Text>
        </View>

       

        {/* Sets and Reps Section */}
        <View className="p-5 bg-white rounded-xl shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">Sets and Reps</Text>
          <Text className="text-base text-gray-600">
            3 Sets x 12-15 Reps
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Description;
