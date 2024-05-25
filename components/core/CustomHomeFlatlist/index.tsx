import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {albumPlaylist} from '../../../utils/dataObjects';
import {useNavigation} from '@react-navigation/core';
import {ApiServices} from '../../../ApiServices';
import axios from 'axios';
import {Playlist} from '../../../types';
import {useAppSelector} from '../../../Redux/hooks';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {};

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CustomHomeFlatList = ({responseData}: any) => {
   

   


  

  const navigation = useNavigation();
  return (
    <>
      <FlatList
        data={responseData ? responseData : [' ', ' ', ' ', ' ']}
        renderItem={({item}) =>
          item === ' ' ? (
            <View className="h-44 mb-10 pt-3 pr-2 w-36 mr-2">
              <ShimmerPlaceholder
                className="h-36 w-36 mb-1 rounded-md"
                shimmerColors={['#282828', '#383838', '#282828']}
              />
              <ShimmerPlaceholder
                className="w-full rounded-md"
                shimmerColors={['#282828', '#383838', '#282828']}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PlayListScreen' as never, {
                  id: item.id,
                  uri: item.playlist_picture,
                  name: item.playlist_name,
                })
              }>
              <View className=" h-44 mb-10 pt-3 pr-2">
                <Image
                  source={{uri: item.playlist_picture}}
                  className="h-36 w-36 mb-1 rounded-md"
                />
                <View className="w-32 pl-1">
                  <Text className="text-xs text-lightgrey">
                    {item.playlist_name.length > 36
                      ? item.playlist_name.slice(0, 32) + '...'
                      : item.playlist_name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default CustomHomeFlatList;
