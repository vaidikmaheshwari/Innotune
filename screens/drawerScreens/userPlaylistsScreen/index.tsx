import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
  SearchResultListItemComponent,
} from '../../../components';
import {userPlaylist} from '../../../utils/dataObjects';
import {useAppSelector} from '../../../Redux/hooks';
import {ApiServices} from '../../../ApiServices';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {};
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const UserPlaylistsScreen = (props: Props) => {
  const User = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const navigation = useNavigation();
  const [userPlaylist, setUserPlaylist] = useState();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Token ${User?.token}`,
      },
    };

    const FetchPlayList = async () => {
      try {
        console.log(ApiServices.FetchMyCreatedPlaylistService);
        const res = await axios.get(
          ApiServices.FetchMyCreatedPlaylistService + '?=&limit=20&offset=0',
          config,
        );
        if (res.status === 200) {
          console.log('Playlist fetched successfully');

          setUserPlaylist(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchPlayList();
  }, []);

  return (
    <BackGroundComponent>
      <View className="bg-darkgrey mt-12">
        <CustomLoginHeaderComponent plaintext="Playlists" />
      </View>
      <View className="w-[94%] mx-auto py-4 h-[89%]">
        <FlatList
          data={
            userPlaylist?.results
              ? userPlaylist.results
              : ['', '', '', '', '', '', '', '', '', '', '']
          }
          renderItem={({item}) =>
            item === '' ? (
              <View className="flex-row items-center mx-2 w-full">
                <ShimmerPlaceholder
                  className="h-12 w-12 rounded-md"
                  shimmerColors={['#282828', '#383838', '#282828']}
                />
                <ShimmerPlaceholder
                  className="mx-3 rounded-lg"
                  shimmerColors={['#282828', '#383838', '#282828']}
                />
              </View>
            ) : (
              <SearchResultListItemComponent
                itemName={item.playlist_name}
                itemPicture={item.playlist_picture}
                onPressEvent={() =>
                  navigation.navigate('PlayListScreen' as never, {
                    id: item.id,
                    uri: item.playlist_picture,
                    name: item.playlist_name,
                  })
                }
              />
            )
          }
          ItemSeparatorComponent={() => <View className="my-2" />}
          ListFooterComponent={<View className="mb-12" />}
        />
      </View>
      <View className="h-12" />
    </BackGroundComponent>
  );
};

export default UserPlaylistsScreen;
