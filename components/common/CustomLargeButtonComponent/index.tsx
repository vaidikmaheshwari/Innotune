import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';

type Props = {
  Icon?: ReactNode;
  plaintext: string;
  green: boolean;
  onPress?: () => void;
};

const CustomLargeButtonComponent = ({
  onPress,
  green,
  plaintext,
  Icon,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={` justify-around mt-2 self-center w-[95%] h-[49px] items-center p-2 flex-row  
      
    
      rounded-full  ${green ? 'bg-green' : ' border-[0.5px] border-text'}`}>
      {Icon ? Icon : null}
      <Text
        className={`text-center text-md font-extrabold mx-19  ${
          green ? 'text-background' : 'text-text'
        }`}>
        {plaintext}
      </Text>
      {Icon ? <View className=" h-2 w-2" /> : null}
    </TouchableOpacity>
  );
};

export default CustomLargeButtonComponent;
