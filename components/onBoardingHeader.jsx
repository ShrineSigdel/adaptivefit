import { View, Image } from 'react-native';
import React from 'react';

type OnBoardingHeaderProps = {
  color1: string;
  color2: string;
  color3: string;
};

const OnBoardingHeader: React.FC<OnBoardingHeaderProps> = ({ color1, color2, color3 }) => {
  return (
    <View className="flex flex-row gap-[15px] mt-5 ml-5">
      <View>
        <Image
          source={require('../assets/images/left-icon.png')}
          className="w-[30px] h-[30px] mt-[5px]"
        />
      </View>
      <View className="flex flex-row w-[300px] justify-around mt-5">
        <View style={{ height: 5, width: 80, backgroundColor: color1 }}></View>
        <View style={{ height: 5, width: 80, backgroundColor: color2 }}></View>
        <View style={{ height: 5, width: 80, backgroundColor: color3 }}></View>
      </View>
    </View>
  );
};

export default OnBoardingHeader;
