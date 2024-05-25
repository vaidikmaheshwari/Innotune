import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

type Props = {
  item: {
    id: string;
    playlist_picture: any;
    playlist_name: string;
  };
  handlePress: any;
};

const backgroundImage1 = require('../../../projectAssets/todayHits.jpg');

const HomeRecentComponent = ({item, handlePress}: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="w-[47%] ml-2  items-center border-text flex-row bg-darkgrey rounded-md   "
      onPress={() => handlePress()}>
      {item.playlist_picture ? (
        <Image
          source={{uri: item.playlist_picture}}
          className="h-12 w-[25%] rounded-l-md "
        />
      ) : (
        <Image
          source={backgroundImage1}
          className="h-12 w-[25%] rounded-l-md "
        />
      )}

      <Text className="w-[70%] text-lightgrey pl-3">{item.playlist_name}</Text>
    </TouchableOpacity>
  );
};

export default HomeRecentComponent;
