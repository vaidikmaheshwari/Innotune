import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React, {useState} from 'react';
import axios from 'axios';
import {ApiServices} from '../../../ApiServices';
import {PlaylistSongsResponse, Song} from '../../../types';
import SearchResultListItem from '../searchResultListItemComponent';
import {useAppSelector} from '../../../Redux/hooks';
import {useNavigation} from '@react-navigation/native';

type Props = {
  setAddSongModal: React.Dispatch<React.SetStateAction<boolean>>;
  playlist: PlaylistSongsResponse;
  fetchPlaylist: () => Promise<void>;
};

const AddSongToPlaylist = ({
  setAddSongModal,
  playlist,
  fetchPlaylist,
}: Props) => {
  const User = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const navigation = useNavigation();
  const [songsResult, setSongsResult] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const config = {
    headers: {
      Authorization: `Token ${User?.token}`,
      'content-type': 'application/json',
    },
  };
  let timer = 1000;
  const searchSong = async (text: string) => {
    setIsLoading(true);
    clearTimeout(timer);

    timer = setTimeout(async () => {
      try {
        if (text) {
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
  const addToPlaylistHandler = async (playlistId: number, songId: number) => {
    const config = {
      headers: {
        Authorization: `Token ${User?.token}`,
      },
    };
    try {
      console.log(ApiServices.MyMusicPlayListMusicService);
      setIsLoading(true);
      const res = await axios.post(
        ApiServices.MyMusicPlayListMusicService,
        {
          playlist_id: playlistId,
          song_id: songId,
        },
        config,
      );
      if (res.status === 200) {
        console.log('Song Added Successfully');
        // navigation.navigate('PlayListScreen' as never, {
        //   id: playlistId,
        //   uri: playlist.playlist.playlist_picture,
        //   name: playlist.playlist.playlist_name,
        // });
        await fetchPlaylist();
        setAddSongModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const removeFromPlaylistHandler = async (
    playlistId: number,
    songId: number,
  ) => {
    const config = {
      headers: {
        Authorization: `Token ${User?.token}`,
      },
      data: {
        playlist_id: playlistId,
        song_id: songId,
      },
    };
    try {
      console.log(ApiServices.MyMusicPlayListMusicService);
      setIsLoading(true);
      const res = await axios.delete(
        ApiServices.MyMusicPlayListMusicService,
        config,
      );
      if (res.status === 200) {
        console.log('Song Deleted Successfully');
        // navigation.navigate('PlayListScreen' as never, {
        //   id: playlistId,
        //   uri: playlist.playlist.playlist_picture,
        //   name: playlist.playlist.playlist_name,
        // });
        await fetchPlaylist();
        setAddSongModal(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const alreadyInPlaylist = (itemId: number) => {
    return playlist.songs.some(song => song.id === itemId);
  };
  return (
    <View className="flex-1 bg-primary pt-12">
      <View className="h-14 flex-row items-center  px-2">
        <TouchableOpacity
          onPress={() => {
            setAddSongModal(false);
          }}
          className="p-1">
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-text text-base font-medium flex-1 text-center">
          Add to this playlist
        </Text>
        <View className="text-lightText text-[16px] w-8" />
      </View>

      <View className="bg-darkgrey h-10 flex-row items-center w-[94%] px-3 mx-auto rounded-md">
        <Ionicons name="search" size={22} color="white" />
        <TextInput
          className="text-text text-base font-medium mx-1 w-[90%] p-2"
          placeholder="Search"
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
                itemPicture={item.song_picture}
                itemName={item.song_name}
                itemArtist={item.credits}
                itemSong={item.audio}
                itemIcon={
                  alreadyInPlaylist(item.id)
                    ? 'remove-circle-outline'
                    : 'add-circle-outline'
                }
                itemIconPressEvent={
                  alreadyInPlaylist(item.id)
                    ? () =>
                        removeFromPlaylistHandler(playlist.playlist.id, item.id)
                    : () => addToPlaylistHandler(playlist.playlist.id, item.id)
                }
                itemIconSize={24}
                itemType="song"
                duration={item.audio_duration}
                itemId={item.id}
              />
            )}
            ItemSeparatorComponent={() => <View className="my-2" />}
          />
        )}
      </View>
    </View>
  );
};

export default AddSongToPlaylist;
