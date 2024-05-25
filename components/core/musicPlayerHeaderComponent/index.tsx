import {View, Text, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';

type Props = {
  onPress1?: ((event: GestureResponderEvent) => void) | null | undefined;
  onPress2?: ((event: GestureResponderEvent) => void) | null | undefined;
  plaintext?: string;
};

const MusicPlayerHeaderComponent = (props: Props) => {
  return (
    <View className=" flex-row justify-between items-center h-16 ml-3 mt-4 z-10">
      <Pressable className="h-10 w-10" onPress={props.onPress1}>
        <Ionicons name="chevron-down" size={30} color="white" />
      </Pressable>
      <Pressable className="">
        <Text className="text-text font-semibold text-sm">
          PLAYING FROM PLAYLIST
        </Text>
        <Text className="text-text font-bold text-sm text-center">
          Indie India
        </Text>
      </Pressable>
      <Pressable className="h-10 w-10" onPress={props.onPress2}>
        <Feather name="more-vertical" size={30} color="white" />
      </Pressable>
    </View>
  );
};

export default MusicPlayerHeaderComponent;
