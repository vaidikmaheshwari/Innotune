import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useAppDispatch} from '../../../Redux/hooks';
import {
  setIsShow,
  setLink,
  setPlayEvent,
} from '../../../Redux/slices/MusicPlayerSlice';

type Props = {
  itemPicture?: string;
  itemName?: string;
  itemArtist?: number;
  itemIcon?: string;
  itemIconSize?: number;
  itemType: string;
  itemSong?: string;
  itemId?: number;
  itemAlbum?: string;
  setActive?: any;
  setSelectedItem?: any;
  duration?: number;
  itemVideo?: any;
  onPressEvent?: () => void;
  itemIconPressEvent?: () => void;
};

const SearchResultListItem = ({
  itemPicture,
  itemName,
  itemArtist,
  itemIcon,
  itemIconSize = 20,
  itemType,
  itemSong,
  itemId,
  itemAlbum,
  setActive,
  setSelectedItem,
  duration,
  itemVideo,
  onPressEvent,
  itemIconPressEvent,
}: Props) => {
  console.log(itemName, itemIcon);
  const dispatch = useAppDispatch();
  const handleDrawer = () => {
    const object = {
      id: itemId,
      name: itemName,
      imageUrl: itemPicture,
      album: itemAlbum,
    };

    setSelectedItem(object);

    setActive(true);
  };
  return (
    <View className="flex-row items-center mx-2 ">
      <TouchableOpacity
        onPress={onPressEvent}
        className="flex-row items-center w-[92%]">
        <Image
          className="h-12 w-12"
          source={
            itemPicture
              ? {uri: itemPicture}
              : require('../../../projectAssets/songPlaceholder.jpeg')
          }
        />
        <View className="w-[80%] mx-3 ">
          <Text className="text-text text-base font-medium ">{itemName}</Text>
          {itemType === 'song' && (
            <Text className="text-lightText text-xs">{`Song · ${itemArtist}`}</Text>
          )}
          {/* {itemType === 'playlist' && (
            <Text className="text-lightText text-xs">{`${item.followers} followers`}</Text>
          )} */}
        </View>
      </TouchableOpacity>

      {itemIcon ? (
        itemIcon == 'ellipsis-vertical' ? (
          <TouchableOpacity onPress={() => handleDrawer()}>
            <Ionicons name={itemIcon} size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={itemIconPressEvent}>
            <Ionicons name={itemIcon} size={itemIconSize} color="white" />
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
};

export default SearchResultListItem;
