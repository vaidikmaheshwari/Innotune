import {View, Text, Image, Pressable} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';

import {Ionicons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {
  setPauseEvent,
  setPlayEvent,
} from '../../../Redux/slices/MusicPlayerSlice';
import {ProgressBar} from '../ProgressBar';
import MusicPlayerScreen from '../../../screens/MusicPlayerScreen';
type Props = {
  setModalVisible: any;
  duration: number;
  songName: string;
  Credits: string;
  image: string;
  modalVisible: boolean;
};

const MusicPlayerBottom = ({
  setModalVisible,
  duration,
  songName,
  Credits,
  image,
  modalVisible,
}: Props) => {
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector(
    state => state.rootReducer.musicPlayer.isPaused,
  );
  const [pos, setPos] = useState<number>(0);
  console.log(
    'Music Component fire ho raha===========================================================',
  );
  return (
    <Pressable
      onPress={() => {
        setModalVisible(true);
      }}
      className=" w-11/12  h-[68] absolute bottom-16 items-center  self-center  bg-green opacity-96 rounded-sm">
      <View className="flex-row justify-between items-center  gap-3 w-full mb-1 px-1">
        <View className=" flex-row items-center gap-3">
          <Image
            source={
              image
                ? {uri: image}
                : require('../../../projectAssets/songPlaceholder.jpeg')
            }
            className=" h-12 w-12 rounded-md"
          />
          <View className=" w-28">
            <Text className="text-text font-semibold text-sm" numberOfLines={1}>
              {songName}
            </Text>
            <Text className="text-text font-light text-xs" numberOfLines={1}>
              {Credits}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center gap-3 ">
          <Feather name="speaker" size={24} color="white" />

          <Ionicons name="add-circle-sharp" size={30} color="white" />
          <Ionicons
            name={isPaused ? 'play' : 'pause'}
            size={24}
            color="white"
          />
        </View>
      </View>
      <ProgressBar songDuration={duration} noRepeat />
      {modalVisible && duration ? (
        <MusicPlayerScreen
          duration={duration}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          progressBar={<ProgressBar songDuration={duration} noRepeat isMusic />}
        />
      ) : null}
    </Pressable>
  );
};

export default MusicPlayerBottom;
