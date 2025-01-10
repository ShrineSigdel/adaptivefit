import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ExerciseCardProps {
  name: string;
  image: any; // Local image or URL
  onAddToWorkout: () => void; // Callback function for adding to workout
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ name, image, onAddToWorkout }) => {
  return (
    <View
      className="w-[45%] bg-white rounded-lg overflow-hidden mb-4 mx-2"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6, // Android shadow
      }}
    >
      {/* Thumbnail */}
      <Image source={image} className="w-full h-32" resizeMode="cover" style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />

      {/* Content */}
      <View className="p-3">
        <Text className="text-lg font-semibold text-black-300">{name}</Text>
        <TouchableOpacity
          onPress={onAddToWorkout}
          className="bg-blue-500 mt-3 py-2 rounded-lg items-center"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 4, // Slight shadow on button for depth
          }}
        >
          <Text className="text-white text-sm font-bold">Add to My Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExerciseCard;
