import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBarr = ({ placeholder, value = '', onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Ionicons name="search" size={20} color="#ab8bff" />
      <TextInput
        onPressIn={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#a8b5db'}
        className='flex-1 ml-2 text-white'
      />
    </View>
  );
};

export default SearchBarr;