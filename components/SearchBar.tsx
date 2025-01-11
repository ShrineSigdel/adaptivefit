import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons from Expo Vector Icons

const SearchBar = () => {
  const handleSearch = () => {
    console.log('Search button clicked!');
  };

  return (
    <View className="flex-row items-center bg-gray-200 rounded-xl px-4 py-2">
      <TextInput
        placeholder="Search"
        className="flex-1 text-black-300 font-poppins text-base"
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons name="search" size={20} color="#555" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
