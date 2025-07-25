import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        
        <Icon name="person" size={40} color="#fff" />
      
      <Text className='text-gray-500 text-base'>profile</Text>
      </View>
    </View>
  )
}

export default profile