import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import {BackGroundComponent, SongBottomDrawer} from '../../../components';
import SearchResultListItem from '../../../components/core/searchResultListItemComponent';
import {useNavigation} from '@react-navigation/native';
import {ApiServices} from '../../../ApiServices';
import {Song} from '../../../types';
import {
  setIsShow,
  setLink,
  setPlayEvent,
} from '../../../Redux/slices/MusicPlayerSlice';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';

type Props = {};
interface SelectedItem {
  id: number;
  name: string;
  imageUrl: string;
  album: string;
}
// const songImage = require('../../../assets/spotifybackground.png');

export default function SearchResultScreen({}: Props) {
  const [songsResult, setSongsResult] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [active, setActive] = useState<boolean>(false);
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const config = {
    headers: {
      Authorization: `Token ${user?.token}`,
      'content-type': 'application/json',
    },
  };
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    id: 0,
    name: '',
    imageUrl: '',
    album: '',
  });
  const dispatch = useAppDispatch();
  let timer = 1000;
  const searchSong = async (text: string) => {
    setIsLoading(true);
    clearTimeout(timer);

    timer = setTimeout(async () => {
      try {
        if (text) {
          console.log(ApiServices.SearchService + text);
          const response = await axios(
            ApiServices.SearchService + text,
            config,
          );
          setSongsResult(response.data.results);
          console.log('Response ', response.data);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
      timer = null;
    }, 1000);
  };
  return (
    <BackGroundComponent>
      <View className="mt-12">
        <View className="bg-darkgrey h-14 flex-row items-center  px-2">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="p-1">
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <TextInput
            className="text-text text-base font-medium mx-1 w-[90%] p-2"
            placeholder="What do you want to listen to?"
            placeholderTextColor={'#777777'}
            autoFocus={true}
            onChangeText={searchSong}
          />
        </View>
        <View className="w-[94%] mx-auto my-3">
          {isLoading ? (
            <ActivityIndicator
              size="medium"
              color="#1ED760"
              className="mt-[70%]"
            />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={songsResult}
              renderItem={({item}) => (
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
              ItemSeparatorComponent={() => <View className="my-2" />}
            />
          )}
        </View>
      </View>
      {active ? (
        <SongBottomDrawer setActive={setActive} selectedItem={selectedItem} />
      ) : null}
    </BackGroundComponent>
  );
}
