import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React from 'react';

type Props = {
  isArtist?: boolean;
  titleText?: string;
  infoText?: string;
  uri?: string;
};

const MusicLibraryComponent = ({isArtist, titleText, infoText, uri}: Props) => {
  return (
    <View className="flex-row h-20 gap-6 items-center mx-0 mt-[2]">
      <Image
        className={`h-[70] w-[70] ${isArtist ? 'rounded-full' : null}`}
        source={
          uri
            ? {uri: uri}
            : require('../../../projectAssets/songPlaceholder.jpeg')
        }
      />
      <View>
        <Text className=" text-lg text-text">{titleText}</Text>
        <View className="flex-row">
          <Text className="text-sm text-lightgrey">{infoText}</Text>
        </View>
      </View>
    </View>
  );
};

export default MusicLibraryComponent;
