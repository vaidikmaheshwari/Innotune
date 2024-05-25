import {
  View,
  Text,
  FlatList,
  Animated,
  PanResponder,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SearchResultListItem from '../../components/core/searchResultListItemComponent';
import {
  AddSongToPlaylist,
  BackGroundComponent,
  CustomLoginHeaderComponent,
  SongBottomDrawer,
  EditPlaylist,
  SortComponent,
} from '../../components';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {
  setIsShow,
  setLink,
  setPause,
  setPauseEvent,
  setPlay,
  setPlayEvent,
} from '../../Redux/slices/MusicPlayerSlice';
import {ApiServices} from '../../ApiServices';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {Playlist, PlaylistSongsResponse} from '../../types';
import {MusicContext} from '../../context/MusicPlayerProvider';
import {setPlaylist} from '../../Redux/slices/musicPlayerQueueSlice';
import PlaylistBottomDrawer from '../../components/core/playlistBottomDrawer';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

type Props = {
  route: {
    params: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      link: string;
      userPlaylist: boolean;
    };
  };
};
interface SelectedItem {
  id: number;
  name: string;
  imageUrl: string;
  album: string;
}
interface SelectedPlaylist {
  playlistId: number;
  playlistName: string;
  playlistImage: string;
  isGlobal: boolean;
}

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const PlayListScreen = ({route}: Props) => {
  const playlist = route.params;
  const [styling, setStyling] = useState<boolean>(false);
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const [position, setPosition] = useState({x: 0, y: 0});
  const [active, setActive] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    id: 0,
    name: '',
    imageUrl: '',
    album: '',
  });
  const [selectedPlaylist, setSelectedPlaylist] = useState<SelectedPlaylist>({
    playlistId: 0,
    playlistName: '',
    playlistImage: '',
    isGlobal: false,
  });
  const [addSongModal, setAddSongModal] = useState<boolean>(false);
  const [editPlaylistModal, setEditPlaylistModal] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<PlaylistSongsResponse>();
  const [playlistActive, setPlaylistActive] = useState<boolean>(false);
  console.log('responseData->>', responseData);
  const isPlaying = useAppSelector(
    state => state.rootReducer.musicPlayer.isPlaying,
  );
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const routes = useRoute();
  const image = routes?.params?.uri;
  const playlistName = routes?.params?.name;
  const fetchPlaylists = routes?.params?.fetchPlaylists;

  useEffect(() => {
    FetchPlayList();
  }, []);
  const FetchPlayList = async () => {
    const id: number = routes?.params?.id;
    const config = {
      headers: {
        Authorization: `Token ${user?.token}`,
        'content-type': 'application/json',
      },
    };
    try {
      // console.log(`Token ${user?.token}`);
      console.log(ApiServices.MyMusicPlayListMusicService + id);
      setResponseData(undefined);
      const res = await axios.get(
        ApiServices.MyMusicPlayListMusicService + id,
        config,
      );

      if (res.status === 200) {
        console.log('in Here');
        console.log(res.data.songs, '=============================songs');
        dispatch(setPlaylist({items: res?.data.songs, id: id}));
        setResponseData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (responseData) {
      const obj = {
        playlistId: responseData.playlist.id,
        playlistName: responseData.playlist.playlist_name,
        playlistImage: responseData.playlist.playlist_picture,
        isGlobal: responseData.playlist.is_global,
      };
      setSelectedPlaylist(obj);
    }
  }, [responseData]);

  const isPaused = useAppSelector(
    state => state.rootReducer.musicPlayer.isPaused,
  );
  let pos = 0;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      Animated.event(
        [
          null,
          // (dis = gestureState.dy),
          // {dy: pan.y, dx: pan.y}, // Update pan.x and pan.y with gesture
        ],
        {useNativeDriver: false}, // Set to false if not using native driver
      );
    },
    onPanResponderRelease: (evt, gestureState) => {
      pos = gestureState.y0;

      // Handle gesture release
    },
  });
  const widthX = pan.x.interpolate({
    inputRange: [-225, 50],
    outputRange: [800, 100],
  });
  const heightY = pan.y.interpolate({
    inputRange: [-225, 50],
    outputRange: [800, 100],
  });
  const opacityY = pan.y.interpolate({
    inputRange: [-225, 50],
    outputRange: [10, 0.5],
  });
  const opacityZ = pan.y.interpolate({
    inputRange: [-225, 70],
    outputRange: [10, 0],
  });
  const opacityH = pan.y.interpolate({
    inputRange: [-225, 70],
    outputRange: [-10, 1],
  });
  const TopH = pan.y.interpolate({
    inputRange: [0, 120],
    outputRange: [415, 70],
  });
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  console.log(isPaused + '=================isPaused ye hai==================');

  return (
    <>
      <BackGroundComponent>
        {responseData ? (
          <>
            <Animated.View
              style={{
                width: '100%',
                position: 'absolute',
                zIndex: 10,

                opacity: opacityH,
              }}>
              <View className="flex-row items-center  p-3 pt-14 bg-darkaccent">
                {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity> */}
                {/* {vaidik} */}
                <Text className="text-[16px] pl-4 font-bold text-text text-center mx-3">
                  {user?.user_info?.username}
                </Text>
              </View>
            </Animated.View>
            <TouchableOpacity
              className=" mt-14 absolute z-20 ml-2"
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
            {styling ? (
              <Pressable className="h-14 w-14 rounded-full bg-green justify-center items-center absolute top-[70] right-5 z-40">
                <Ionicons
                  name={isPaused ? 'play' : 'pause'}
                  size={34}
                  color="white"
                />
              </Pressable>
            ) : null}
            <LinearGradient
              colors={['rgba(231, 76, 60 ,0.8)', 'transparent']}
              end={{x: 0.5, y: 0.7}}
              className="flex-1 bg-primary ">
              <FlatList
                ListFooterComponent={<View className=" h-44 w-full" />}
                ListHeaderComponent={
                  <>
                    <Animated.View
                      style={[
                        {
                          opacity: opacityY,
                        },
                      ]}>
                      <SortComponent />
                    </Animated.View>

                    <Animated.Image
                      source={
                        responseData?.playlist?.playlist_picture
                          ? {uri: responseData?.playlist?.playlist_picture}
                          : require('../../projectAssets/songPlaceholder.jpeg')
                      }
                      style={[
                        {
                          opacity: opacityZ,
                          borderRadius: 0,
                          marginTop: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          height: heightY,
                          width: widthX,
                        },
                      ]}
                      {...panResponder.panHandlers}></Animated.Image>
                    <Text className="mx-5 my-2  text-text text-xl font-medium">
                      {responseData.playlist.playlist_name}
                    </Text>
                    <View className="mb-7 flex-row justify-between mx-5 items-center ">
                      <View className=" flex-row gap-2 items-center ">
                        {responseData?.playlist.is_global === false ? (
                          <TouchableOpacity
                            onPress={() => setEditPlaylistModal(true)}>
                            <Ionicons name="pencil" size={20} color="white" />
                          </TouchableOpacity>
                        ) : (
                          ''
                        )}
                        <Pressable>
                          <Ionicons name="add" size={24} color="white" />
                        </Pressable>
                        <Pressable>
                          <Ionicons name="shuffle" size={24} color="white" />
                        </Pressable>
                        <Pressable onPress={() => setPlaylistActive(true)}>
                          <Ionicons
                            name="ellipsis-vertical"
                            size={24}
                            color="white"
                          />
                        </Pressable>
                      </View>

                      <Pressable
                        className="h-14 w-14 rounded-full bg-green justify-center items-center  "
                        style={styling ? styles.container : null}
                        onPress={() => {
                          dispatch(setIsShow());
                          if (!isPaused) {
                            dispatch(setPause());
                          } else {
                            dispatch(setPlayEvent());
                          }
                        }}>
                        <Ionicons
                          name={isPaused ? 'play' : 'pause'}
                          size={40}
                          color="white"
                        />
                      </Pressable>
                    </View>
                    {responseData?.playlist.is_global === false ? (
                      <TouchableOpacity
                        className="flex-row items-center mx-2 mb-4"
                        onPress={() => setAddSongModal(true)}>
                        <View className="bg-darkgrey p-2">
                          <Ionicons name={'add'} size={32} color="#d3d3d3" />
                        </View>
                        <Text className="text-text text-base font-medium mx-3">
                          Add to this playlist
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      ''
                    )}
                  </>
                }
                showsVerticalScrollIndicator={false}
                data={
                  responseData?.songs
                    ? responseData.songs
                    : ['', '', '', '', '', '']
                }
                renderItem={({item}) =>
                  item === '' ? (
                    <View className="flex-row items-center mx-2 w-full">
                      <ShimmerPlaceholder
                        className="h-12 w-12 rounded-md"
                        shimmerColors={['#282828', '#383838', '#282828']}
                      />
                      <View>
                        <ShimmerPlaceholder
                          className="mx-3 rounded-lg mb-1"
                          shimmerColors={['#282828', '#383838', '#282828']}
                        />
                        <ShimmerPlaceholder
                          className="mx-3 w-[50%] rounded-lg"
                          shimmerColors={['#282828', '#383838', '#282828']}
                        />
                      </View>
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
                  )
                }
                ItemSeparatorComponent={() => <View className="my-2" />}
                onScroll={e => {
                  pan.setValue({
                    x: e.nativeEvent.contentOffset.y,
                    y: e.nativeEvent.contentOffset.y,
                  });
                  if (e.nativeEvent.contentOffset.y > 111) {
                    setStyling(true);
                  }
                  if (e.nativeEvent.contentOffset.y <= 90) {
                    setStyling(false);
                  }
                }}
              />
              {active ? (
                <SongBottomDrawer
                  setActive={setActive}
                  selectedItem={selectedItem}
                />
              ) : null}
              {playlistActive ? (
                <PlaylistBottomDrawer
                  setActive={setPlaylistActive}
                  selectedPlaylist={selectedPlaylist}
                />
              ) : null}
            </LinearGradient>
          </>
        ) : (
          <ActivityIndicator
            size="medium"
            color="#1ED760"
            className="mt-[90%]"
          />
        )}
      </BackGroundComponent>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={addSongModal}
        onRequestClose={() => {
          setAddSongModal(!addSongModal);
        }}>
        <AddSongToPlaylist
          setAddSongModal={setAddSongModal}
          playlist={responseData}
          fetchPlaylist={FetchPlayList}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={editPlaylistModal}
        onRequestClose={() => {
          setEditPlaylistModal(!editPlaylistModal);
        }}>
        <EditPlaylist
          setEditPlaylistModal={setEditPlaylistModal}
          playlist={responseData}
          fetchPlaylist={FetchPlayList}
          fetchPlaylists={fetchPlaylists}
        />
      </Modal>
    </>
  );
};

export default PlayListScreen;

const styles = StyleSheet.create({
  container: {
    opacity: 0,
  },
});
