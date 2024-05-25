import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';

type Props = {};

const SortComponent = (props: Props) => {
  return (
    <View className="flex-row mx-2 self-center mt-24 w-full justify-center ">
      <View className=" p-1 opacity-30 flex-row bg-secondary items-center rounded-md w-72 h-10 ">
        <Ionicons name="search" size={30} color="white" />
        <TextInput
          className="ml-1 w-[90%] font-semibold"
          placeholder="Find a Playlist"
          placeholderTextColor={'white'}
        />
      </View>
      <Pressable className=" ml-1 items-center justify-center  rounded-md opacity-30 bg-secondary  w-16 h-10">
        <Text className="absolute text-text font-semibold">Sort</Text>
      </Pressable>
    </View>
  );
};

export default SortComponent;
