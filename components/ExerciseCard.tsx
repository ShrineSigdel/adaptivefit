import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Bookmark } from 'lucide-react-native'; // Assuming you are using lucide-react-native

interface ExerciseCardProps {
  title: string;
  image: string;
  tags: string[];
}

export default function ExerciseCard({ 
  title = "Barbell Back Squat",
  image = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-01-10%2020-53-47-7PrAsSEpHI9Ez8074LjHyUhbvmhvy9.png",
  tags = ["Legs", "Liftingbar"]
}: ExerciseCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden mb-4">
      <View className="p-4 flex-row items-start relative">
        {/* Image */}
        <Image source={{ uri: image }} className="w-24 h-24 rounded-lg bg-sky-100 mr-4" />

        {/* Content */}
        <View className="flex-1">
          <Text className="text-xl font-semibold mb-2">{title}</Text>
          <View className="flex-row flex-wrap">
            {tags.map((tag, index) => (
              <Text key={index} className="text-sm text-gray-500">
                {index > 0 && ' • '}{tag}
              </Text>
            ))}
          </View>
        </View>

        {/* Bookmark Button */}
        <TouchableOpacity className="absolute top-4 right-4" accessibilityLabel="Bookmark exercise">
          <Bookmark width={24} height={24} color="gray" />
        </TouchableOpacity>
      </View>
    </Card>
  );
}
