import {View, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';

type Props = {
  icon: string;
  text: string;
  onPressEvent?: () => void;
};

const DrawerItem = ({icon, text, onPressEvent}: Props) => {
  return (
    <TouchableOpacity onPress={onPressEvent}>
      <View className="flex-row items-center p-4">
        <Ionicons name={icon} size={30} color="white" />
        <Text className="text-text text-lg ml-3" numberOfLines={1}>
          {' '}
          {text}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerItem;
