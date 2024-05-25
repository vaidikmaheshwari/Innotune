import {View, Text, ScrollView, Pressable, FlatList, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  ArtistCard,
  BackGroundComponent,
  CustomBottomDrawer,
  CustomLoginHeaderComponent,
  MusicPlayerHeaderComponent,
} from '../../components';

import {Audio, ResizeMode, Video} from 'expo-av';
import {Ionicons} from '@expo/vector-icons';
import {AntDesign, Feather} from '@expo/vector-icons';

import MusicLibraryComponent from '../../components/common/musicLibraryComponent';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {
  setLink,
  setPause,
  setPlay,
  setPlayEvent,
} from '../../Redux/slices/MusicPlayerSlice';
import {ProgressBar} from '../../components/common/ProgressBar';
import {
  goTonextSong,
  nextSong,
  prevSong,
} from '../../Redux/slices/musicPlayerQueueSlice';
import axios from 'axios';
import {ApiServices} from '../../ApiServices';

type Props = {
  modalVisible: boolean;
  setModalVisible: any;
  duration: number;
  progressBar: any;
};

// const localVideoUrl = require('../../assets/hey-mama-minified.mp4');
// const posterSource = require('../../assets/video-poster2.jpeg');

// const followImage = require('../../assets/Logo.png');
// const spotifyBackground = require('../../assets/spotifybackground.png');

const MusicPlayerScreen = ({
  modalVisible,
  setModalVisible,
  duration,
  progressBar,
}: Props) => {
  const [responseData, setResponseData] = useState();

  const postRecentSong = async () => {
    const config = {
      headers: {
        Authorization: `Token ${user?.token}`,
        'content-type': 'application/json',
      },
    };
    try {
      // console.log(`Token ${user?.token}`);
      console.log(ApiServices.GetRecentSongService);
      // setResponseData(undefined);
      const res = await axios.post(
        ApiServices.GetRecentSongService,
        {
          song_id: CurrentSong.id,
          user_id: user?.user_info?.id,
          song_name: CurrentSong.song_name,
          song_picture: CurrentSong.image,
          video: CurrentSong.video,
          audio: CurrentSong.musicPlayerLink,
          song_description: CurrentSong.song_credits,
          audio_duration: CurrentSong.duration,
        },
        config,
      );

      if (res.status === 200) {
        console.log(
          'in Here===========================================================================',
        );
        setResponseData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const CurrentSong = useAppSelector(state => state.rootReducer.musicPlayer);
  const body = {
    song_id: CurrentSong.id,
    user_id: user?.user_info?.id,
  };

  const config = {
    headers: {
      Authorization: `Token ${user?.token}`,
    },
  };
  const LikeCurrentSong = async () => {
    try {
      const res = await axios.post(ApiServices.LikeSongService, body, config);
      if (res.status == 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const [soundDuration, setSoundDuration] = useState(0);
  const [bluetoothDevice, setBluetoothDevice] = useState(null);
  // const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState<boolean>(false);

  const [bottomDrawer, setBottomDrawer] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector(
    state => state.rootReducer.musicPlayer.isPaused,
  );
  // if (user?.liked_songs && user?.liked_songs.includes(CurrentSong.id)) {
  //   setLiked(true);
  // } else {
  //   setLiked(false);
  // }
  const video = useRef(null);
  const data = useAppSelector(state => state.rootReducer.musicPlayer);
  const nextSong = useAppSelector(
    state => state.rootReducer.MusicPlayerQueueReducer,
  );
  const nextSongIndex = nextSong.currIndex + 1;
  const prevSongIndex = nextSong.currIndex - 1;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <BackGroundComponent>
        <ScrollView
          renderToHardwareTextureAndroid
          style={{
            height: '100%',
          }}>
          <View className="h-[1000]">
            <MusicPlayerHeaderComponent
              onPress1={() => setModalVisible(false)}
              onPress2={() => setBottomDrawer(true)}
            />
            <Video
              ref={video}
              className=" h-4/5 w-full border-[1px] border-white absolute -z-20 "
              source={{uri: data.video}}
              posterStyle={{
                resizeMode: 'contain',
                height: '100%',
                width: '100%',
              }}
              usePoster={true}
              posterSource={{uri: data.image}}
              shouldPlay={true}
              resizeMode={ResizeMode.COVER}
              isLooping={true}
              isMuted={true}
              useNativeControls={false}
              // onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View className="absolute bg-primary -z-10 h-full opacity-60 " />
            <View className="top-[45%]">
              <View className=" flex-row justify-between items-center mx-5  ">
                <Pressable>
                  <View className=" w-48 h-20 ">
                    <Text className="text-text font-bold text-2xl">
                      {data.song_name}
                    </Text>
                    <Text
                      className="text-text  font-light text-lg"
                      numberOfLines={1}>
                      {data.song_credits}
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setLiked(!liked);
                    LikeCurrentSong();
                  }}>
                  <Ionicons
                    name={liked ? 'checkmark-circle-sharp' : 'add-circle-sharp'}
                    size={30}
                    color={liked ? 'green' : 'white'}
                  />
                </Pressable>
              </View>
              <View className=" flex-row  mx-4 justify-between items-center">
                {/* <ProgressBar songDuration={duration} isMusic noRepeat i={0} /> */}
                {progressBar}
              </View>
              <View className=" flex-row w-full mx-5 justify-evenly items-center mt-5 self-center">
                <Pressable>
                  <Ionicons name="shuffle-outline" size={32} color="green" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (nextSong.currIndex > 0) {
                      dispatch(
                        setLink({
                          link: nextSong.songsList[prevSongIndex].audio,
                          duration:
                            nextSong.songsList[prevSongIndex].audio_duration,
                          song_name:
                            nextSong.songsList[prevSongIndex].song_name,
                          image: nextSong.songsList[prevSongIndex].song_picture,
                          video: nextSong.songsList[prevSongIndex].video,
                          song_credits:
                            nextSong.songsList[prevSongIndex].credits,
                          id: nextSong.songsList[prevSongIndex].id,
                        }),
                      );
                      dispatch(prevSong());
                      dispatch(setPlayEvent());
                    }
                  }}>
                  <AntDesign name="stepbackward" size={24} color="white" />
                </Pressable>
                <Pressable
                  className="h-20 w-20 justify-center items-center"
                  onPress={() => {
                    if (isPaused) {
                      dispatch(setPlayEvent());
                    } else {
                      dispatch(setPause());
                    }
                  }}>
                  <AntDesign
                    name={!isPaused ? 'pause' : 'play'}
                    size={54}
                    color="white"
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (nextSong.currIndex < nextSong.totalIndex - 1) {
                      postRecentSong();
                      dispatch(
                        setLink({
                          link: nextSong.songsList[nextSongIndex].audio,
                          duration:
                            nextSong.songsList[nextSongIndex].audio_duration,
                          song_name:
                            nextSong.songsList[nextSongIndex].song_name,
                          image: nextSong.songsList[nextSongIndex].song_picture,
                          video: nextSong.songsList[nextSongIndex].video,
                          song_credits:
                            nextSong.songsList[nextSongIndex].credits,
                          id: nextSong.songsList[nextSongIndex].id,
                        }),
                      );
                      dispatch(goTonextSong());
                      dispatch(setPlayEvent());
                    }
                  }}>
                  <AntDesign name="stepforward" size={24} color="white" />
                </Pressable>
                <Pressable>
                  <Ionicons name="stopwatch" size={24} color="white" />
                </Pressable>
              </View>
              <View className="flex-row w-[90%] mx-auto justify-between items-center mt-5 self-center">
                <Pressable>
                  {bluetoothDevice ? (
                    <View className="flex-row gap-2">
                      <Feather name="headphones" size={18} color="green" />

                      <Text className="text-green">Airdops 121</Text>
                    </View>
                  ) : (
                    <Feather name="speaker" size={18} color="white" />
                  )}
                </Pressable>
                <Pressable>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
          </View>

          <ArtistCard />
        </ScrollView>
        {bottomDrawer ? (
          <CustomBottomDrawer setActive={setBottomDrawer} />
        ) : null}
      </BackGroundComponent>
    </Modal>
  );
};

export default MusicPlayerScreen;
