import React from 'react';
import {View, Text, Image} from 'react-native';

type Props = {
  item: {
    genre: string;
    genre_picture: string;
  };
};

const SearchGenreComponent = ({item}: Props) => {
  return (
    <View className="w-1/2 items-center border-text ">
      <Text className=" text-text absolute z-10 top-3 left-4 text-sm font-medium">
        {item.genre}
      </Text>
      <Image
        source={{uri: item.genre_picture}}
        className="h-28 w-[95%] rounded-lg"
      />
    </View>
  );
};

export default SearchGenreComponent;
