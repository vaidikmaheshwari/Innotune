import {View, Text, TextInput} from 'react-native';
import React, {ReactNode, useState} from 'react';

type Props = {
  plaintext: string;
  infoText?: string;
  Icon?: ReactNode;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>> | undefined;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomLoginTextField = ({
  plaintext,
  infoText,
  Icon,
  value,
  setValue,
  setActive,
}: Props) => {
  return (
    <View className="justify-center self-center w-full ">
      <Text className="text-[20px] text-text font-bold mx-5 mt-5 ">
        {plaintext}
      </Text>
      <View className="h-[51] w-[90%] self-center bg-grey rounded-md mt-4 flex-row items-center ">
        <TextInput
          style={{color: 'white'}}
          className="h-[96%] px-3 w-[90%]"
          value={value}
          onChangeText={text => {
            setValue && setValue(text);
            if (value !== null) {
              setActive && setActive(true);
            }
          }}
        />
        {Icon ? Icon : null}
      </View>
      <Text className="text-xs text-text mt-1  mx-5">{infoText}</Text>
    </View>
  );
};

export default CustomLoginTextField;
