import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';

type OnBoardingHeaderProps = {
  color1: string;
  color2: string;
  color3: string;
};

const OnBoardingHeader: React.FC<OnBoardingHeaderProps> = ({ color1, color2, color3, isFirstPage = false }) => {
  const [barWidth1] = useState(new Animated.Value(0));
  const [barWidth2] = useState(new Animated.Value(0));
  const [barWidth3] = useState(new Animated.Value(0));
  const router = useRouter();

  const goBack = () => {
    router.back(); // Go back to the previous page
  };

  useEffect(() => {
    // Animate the width of the bars when the component mounts or updates
    Animated.timing(barWidth1, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(barWidth2, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(barWidth3, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [color1, color2, color3]);

  return (
    <View className="flex flex-row gap-[10px] mt-5 ml-[5px]">
        <TouchableOpacity onPress={goBack} className="flex justify-center items-center">
          <Image
            source={require('../assets/images/left-icon.png')}
            style={{ width: 42, height: 42 }}
          />
        </TouchableOpacity>

      {/* Progress Bar */}
      <View className="flex flex-row w-[300px] justify-around mt-[18px]">
        <Animated.View
          style={{ height: 5, width: barWidth1, backgroundColor: color1 }}
        ></Animated.View>
        <Animated.View
          style={{ height: 5, width: barWidth2, backgroundColor: color2 }}
        ></Animated.View>
        <Animated.View
          style={{ height: 5, width: barWidth3, backgroundColor: color3 }}
        ></Animated.View>
      </View>
    </View>
  );
};

export default OnBoardingHeader;
