import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, TextInput, Pressable, GestureResponderEvent, TouchableOpacity} from 'react-native'

type Props = {
  onPressEvent : () => void 
}

export default function SearchComponent({onPressEvent}: Props) {
  
  return (
    <View className="my-4 rounded-lg bg-secondary ">
      <TouchableOpacity onPress={onPressEvent}>
        <View className="absolute left-3 top-3 z-10">
          <Ionicons name="search" size={28} color="black"  />
        </View>
        <TextInput
          className="bg-secondary p-3 pl-12 rounded-lg text-lg font-medium"
          placeholder='What do you want to listen to?'
          editable={false}
        />
      </TouchableOpacity>
    </View>
  );
}
