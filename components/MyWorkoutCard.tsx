import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; // Importing Feather icons (you can use other libraries)
import { Ionicons } from '@expo/vector-icons'; // For the checkbox icon

interface MyWorkoutCardProps {
  title: string;
  image: any; // The image prop can be any type that represents the image
  sets: number;
  reps: number;
  onPress: () => void;
  onRemove: () => void; // Function to handle exercise removal
  onMarkComplete: () => void; // Function to handle marking the exercise as complete
}

export default function MyWorkoutCard({
  title,
  image,
  sets,
  reps,
  onPress,
  onRemove,
  onMarkComplete,
}: MyWorkoutCardProps) {
  const [clicked, setClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // To track whether the exercise is marked as completed

  const handlePressIn = () => setClicked(true);
  const handlePressOut = () => setClicked(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
    onMarkComplete(); // Call the callback to handle completion (e.g., updating state)
  };

  return (
    <Card style={{ width: '100%', maxWidth: '90%', overflow: 'hidden', marginBottom: 16 }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          transform: [{ scale: clicked ? 0.98 : 1 }],
          transition: 'transform 0.1s ease',
        }}
      >
        <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
          {/* Image */}
          <Image source={image} style={{ width: 60, height: 60, borderRadius: 12, marginRight: 16 }} />

          {/* Content */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>{title}</Text>
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
              Sets: {sets} | Reps: {reps}
            </Text>
          </View>

          {/* Container for checkbox and delete button */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Checkbox to mark as complete */}
            <TouchableOpacity onPress={handleCheckboxPress} style={{ marginRight: 16 }}>
              <Ionicons
                name={isChecked ? 'checkbox' : 'checkbox-outline'}
                size={24}
                color={isChecked ? '#198BEF' : '#000'}
              />
            </TouchableOpacity>

            {/* Remove Button */}
            <TouchableOpacity onPress={onRemove} style={{ marginRight: 0 }}>
              <Feather name="trash" size={24} color="#198BEF" /> {/* Trash icon matching the app's primary color */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
