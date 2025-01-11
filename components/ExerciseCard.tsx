import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ExerciseCardProps {
  name: string;
  image: any;
  onAddToWorkout: () => void;
  onPress: () => void; // Callback for navigation
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ name, image, onAddToWorkout, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[45%] bg-[#f3eef5] rounded-lg overflow-hidden mb-4 mx-2"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6, // Android shadow
      }}
    >
      {/* Exercise Thumbnail */}
      <Image source={image} className="w-full h-32" resizeMode="cover" style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
      {/* Card Content */}
      <View className="p-3">
        <Text className="text-lg font-semibold text-black">{name}</Text>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation(); // Prevent navigation when clicking the button
            onAddToWorkout();
          }}
          className="bg-blue-500 mt-3 py-2 rounded-lg items-center"
        >
          <Text className="text-white text-sm font-bold">Add to My Workout</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
