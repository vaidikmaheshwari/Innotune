import {View, Text, Pressable} from 'react-native';
import React, {forwardRef, useState} from 'react';

type Props = {
  btnTxt: string;
  btnHandler: Function;
  isActive: boolean;
  onLayout?: any;
};

const HomeHeaderBtn = forwardRef(
  ({btnTxt, btnHandler, isActive, onLayout}: Props, ref) => {
    return (
      <View>
        <Pressable
          onPress={() => btnHandler()}
          className={`justify-center px-[18] mx-[3] rounded-3xl h-8  ${
            isActive ? 'bg-green' : ' bg-darkgrey '
          }`}>
          <Text
            className={`text-center text-sm  ${
              isActive ? ' text-primary' : ' text-text'
            }`}>
            {btnTxt}
          </Text>
        </Pressable>
      </View>
    );
  },
);

export default HomeHeaderBtn;
