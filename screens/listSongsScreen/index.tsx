import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
  SongBottomDrawer,
} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {ApiServices} from '../../ApiServices';
import SearchResultListItem from '../../components/core/searchResultListItemComponent';
import {
  setIsShow,
  setLink,
  setPlayEvent,
} from '../../Redux/slices/MusicPlayerSlice';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {};
interface SelectedItem {
  id: number;
  name: string;
  imageUrl: string;
  album: string;
}
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ListSongsScreen = ({}: Props) => {
  const route = useRoute();
  const headerTxt = route.params.headerTxt;
  const [active, setActive] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    id: 0,
    name: '',
    imageUrl: '',
    album: '',
  });

  const [listSongs, setListSongs] = useState<any>();
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const getRecentSongs = async () => {
    const config = {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
    };
    const limit = 10;
    const offset = 0;
    try {
      const response = await axios.get(
        `${ApiServices.GetRecentSongService}` +
          `?limit=${limit}&offset=${offset}`,
        config,
      );
      console.log(response.data);
      setListSongs(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getLikedSongs = async () => {
    const config = {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
    };
    const limit = 10;
    const offset = 0;
    const id = user?.user_info?.id;
    try {
      const response = await axios.get(
        `${ApiServices.GetLikeSongService}${id}` +
          `/?limit=${limit}&offset=${offset}`,
        config,
      );
      console.log(response.data);
      setListSongs(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // getRecentSongs();
    // getLikedSongs();
    if (headerTxt == 'Liked Songs') {
      getLikedSongs();
    } else if (headerTxt == 'Recent Songs') {
      getRecentSongs();
    }
  }, []);
  return (
    <BackGroundComponent notTranslucent>
      <CustomLoginHeaderComponent plaintext={headerTxt} />
      {
        <FlatList
          className="mt-2"
          showsVerticalScrollIndicator={false}
          data={listSongs ? listSongs : [' ', ' ', ' ', ' ']}
          renderItem={({item}) => (
            <>
              {item == ' ' ? (
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
                <SearchResultListItem
                  itemName={item.song_name}
                  itemPicture={item.song_picture}
                  itemArtist={item.credits}
                  itemType="song"
                  itemSong={item.audio}
                  duration={item.audio_duration}
                  itemVideo={item.video}
                  itemIcon="ellipsis-vertical"
                  itemId={item.id}
                  itemAlbum={item.album_name}
                  setActive={setActive}
                  setSelectedItem={setSelectedItem}
                  onPressEvent={() => {
                    dispatch(
                      setLink({
                        link: item.audio,
                        song_credits: item.credits,
                        song_name: item.song_name,
                        duration: item.audio_duration,
                        image: item.song_picture,
                        video: item.video,
                        id: item.id,
                      }),
                    );
                    dispatch(setPlayEvent());
                    dispatch(setIsShow());

                    console.log('fired');
                  }}
                />
              )}
            </>
          )}
          ItemSeparatorComponent={() => <View className="my-2" />}
        />
      }
      {active ? (
        <SongBottomDrawer setActive={setActive} selectedItem={selectedItem} />
      ) : null}
    </BackGroundComponent>
  );
};

export default ListSongsScreen;
