import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';  // Importing Feather icons (you can use other libraries too)

interface ExerciseCardProps {
  title: string;
  image: any; // The image prop can be any type that represents the image
  sets: number;
  reps: number;
}

const streakIcon = require('../assets/images/streak.png');

export default function ExerciseCard({ 
  title, 
  image, 
  sets, 
  reps 
}: ExerciseCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden mb-4">
      <View className="p-4 flex-row items-start relative">
        {/* Image */}
        <Image source={image} className="w-24 h-24 rounded-lg mr-4" />

        {/* Content */}
        <View className="flex-1">
          <Text className="text-xl font-semibold mb-2">{title}</Text>
          <Text className="text-sm text-gray-500 mb-2">Sets: {sets} | Reps: {reps}</Text>
        </View>

        {/* Arrow Button */}
        <TouchableOpacity className="absolute top-4 right-4" accessibilityLabel="Go to exercise details">
          <Feather name="arrow-right" size={24} color="black" /> {/* You can adjust size and color here */}
        </TouchableOpacity>
      </View>
    </Card>
  );
}
