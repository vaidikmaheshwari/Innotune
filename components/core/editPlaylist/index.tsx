import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '../../../Redux/hooks';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
  SearchResultListItemComponent,
} from '../../';
import {ApiServices} from '../../../ApiServices';
import axios from 'axios';
import {PlaylistSongsResponse} from '../../../types';

type Props = {
  setEditPlaylistModal: React.Dispatch<React.SetStateAction<boolean>>;
  playlist: PlaylistSongsResponse;
  fetchPlaylist: () => Promise<void>;
  fetchPlaylists: () => Promise<void>;
};

const EditPlaylist = ({
  setEditPlaylistModal,
  playlist,
  fetchPlaylist,
  fetchPlaylists,
}: Props) => {
  console.log('Playlist data:', playlist);

  const [image, setImage] = useState<string>('');
  const [playlistName, setPlaylistName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {User} = useAppSelector(state => state.rootReducer.LoginReducer);
  useEffect(() => {
    setPlaylistName(playlist.playlist.playlist_name);
    setImage(playlist.playlist.playlist_picture);
  }, []);
  const onSave = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${User?.token}`,
        },
      };
      const formData = new FormData();
      formData.append('playlist_name', playlistName);
      formData.append('user_id', playlist.playlist.user_id);
      if (image) {
        const localUri = image;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('playlist_picture', {
          uri: localUri,
          name: filename,
          type,
        });
      }
      console.log(formData);
      setIsLoading(true);
      const response = await axios.patch(
        ApiServices.CreatePlaylistService + playlist.playlist.id + '/',
        formData,
        config,
      );
      console.log(response.data);
      fetchPlaylists();
      await fetchPlaylist();
      setIsLoading(false);
      setEditPlaylistModal(false);
    } catch (e) {
      console.log(e.message);
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
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('Image: ', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const headerRight = isLoading ? (
    <ActivityIndicator size="large" color="#fff" />
  ) : (
    'Save'
  );
  return (
    <BackGroundComponent>
      <View className="mt-12">
        {/* Header */}
        <View className="h-14 flex-row items-center  px-2">
          <TouchableOpacity
            onPress={() => {
              setEditPlaylistModal(false);
            }}
            className="p-1">
            <Ionicons name="close-outline" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-text text-base font-medium flex-1 text-center">
            Edit Playlist
          </Text>
          <TouchableOpacity
            className="text-lightText text-[16px] flex-end mr-2"
            onPress={onSave}>
            <Text className="text-text text-base font-medium  items-center">
              {headerRight}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View className="my-5 self-center ">
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                image
                  ? {uri: image}
                  : require('../../../projectAssets/songPlaceholder.jpeg')
              }
              className="h-36 w-36 "
            />
          </TouchableOpacity>
        </View>

        <View className="items-center border-b-[1px] border-grey mx-12 my-4 py-1">
          <TextInput
            className="text-text text-[20px] text-center"
            value={playlistName}
            onChangeText={setPlaylistName}
            placeholder="Playlist Name"
            placeholderTextColor={'#D3D3D3'}
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
              data={playlist.songs}
              renderItem={({item}) => (
                <SearchResultListItemComponent
                  itemPicture={item.song_picture}
                  itemName={item.song_name}
                  itemArtist={item.credits}
                  itemSong={item.audio}
                  itemIcon={'remove-circle-outline'}
                  itemIconPressEvent={() =>
                    removeFromPlaylistHandler(playlist.playlist.id, item.id)
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
    </BackGroundComponent>
  );
};

export default EditPlaylist;
