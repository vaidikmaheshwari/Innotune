import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  plaintext?: string;
  icon?: string;
  headerRight?: string | Element;
  headerRightEvent ?: ()=> void
};

const CustomLoginHeaderComponent = ({plaintext, headerRight, icon, headerRightEvent}: Props) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row  mx-3 items-center py-3 ">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {icon ? (
          <Ionicons name={icon} size={32} color="white" />
        ) : (
          <Ionicons name="arrow-back" size={32} color="white" />
        )}
      </TouchableOpacity>
      <Text className="text-[16px] flex-1 font-bold text-text text-center ">
        {plaintext}
      </Text>
      {headerRight ? (
        <TouchableOpacity onPress={headerRightEvent}>
          <Text className="text-lightText text-[16px] mr-1">{headerRight}</Text>
        </TouchableOpacity>
      ) : (
        <View className="text-lightText text-[16px] w-8" />
      )}
    </View>
  );
};

export default CustomLoginHeaderComponent;
