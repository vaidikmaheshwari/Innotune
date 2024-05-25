import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';
import {Video, Audio, ResizeMode} from 'expo-av';
import {useEffect, useRef, useState} from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
} from '../../../components';
import {Ionicons} from '@expo/vector-icons';
import {genreList} from '../../../utils/dataObjects';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React from 'react';
import {ProgressBar} from '../../../components/common/ProgressBar';
import {useAppDispatch} from '../../../Redux/hooks';
import {setPause, setPlayEvent} from '../../../Redux/slices/MusicPlayerSlice';

interface Song {
  id: number;
  created_at: string;
  album_name: string;
  likes: number;
  comments: number;
  artist_id: number;
  song_name: string;
  song_picture: string;
  song_description: string;
  audio: string;
  video: string;
  audio_duration: number;
  genre: string;
  lyrics: string | null;
  credits: string;
}
interface Props {
  route: {
    params: {
      genre: {
        genre: string;
        genre_picture: string;
      };
      songs: Song[];
    };
  };
}

// const localVideoUrl = require('../../../assets/hey-mama-minified.mp4');
// const posterSource = require('../../../assets/video-poster2.jpeg');
const followImage = require('../../../projectAssets/Logo.png');
// const spotifyBackground = require('../../../assets/spotifybackground.png');
// const song = require('../../../assets/butter-audio.mp3');

const GenreSongVideoScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    dispatch(setPause());
    return () => {
      dispatch(setPlayEvent());
    };
  }, []);

  return (
    <BackGroundComponent notTranslucent>
      <View className="absolute bg-none z-20 w-full ">
        <CustomLoginHeaderComponent
          plaintext={'#' + route.params.genre.genre}
        />
      </View>
      <FlatList
        data={route.params.songs}
        pagingEnabled
        style={{height: screenHeight, width: screenWidth}}
        renderItem={({item, index}) => (
          <GenreSongComponent
            screenHeight={screenHeight - 5}
            screenWidth={screenWidth}
            index={index}
            selectedIndex={selectedIndex}
            item={item}
          />
        )}
        onScroll={e => {
          setSelectedIndex(
            e.nativeEvent.contentOffset.y.toFixed(0) / screenHeight,
          );
        }}
      />
      {/* <GenreSongComponent
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        index={0}
        selectedIndex={0}
        item={route.params.songs[0]}
      /> */}
    </BackGroundComponent>
  );
};

type Props2 = {
  screenHeight: number;
  screenWidth: number;
  index: number;
  selectedIndex: number;
  item: Song;
  // item:{
  //   id: string,
  //   song: number,
  //   backgroundVideo: number,
  //   backgroundPoster: number,
  //   albumArt: number,
  //   songName: string,
  //   artists: string,
  // }
};

const GenreSongComponent = ({
  item,
  screenHeight,
  screenWidth,
  index,
  selectedIndex,
}: Props2) => {
  const [soundDuration, setSoundDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState();
  const video = useRef(null);
  useEffect(() => {
    (async () => {
      console.log('Loading Sound');
      const {sound} = await Audio.Sound.createAsync(
        {uri: item.audio},
        {shouldPlay: false, isLooping: true},
      );
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
      const soundInfo = await sound.getStatusAsync();
      setSoundDuration(soundInfo.durationMillis);
    })();
  }, []);
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  console.log('Selected Index===>', selectedIndex);
  useEffect(() => {
    sound &&
      (async () => {
        if (Math.round(selectedIndex) == index) {
          await sound.playAsync();
        } else {
          await sound.stopAsync();
        }
      })();
  }, [selectedIndex, index, sound]);

  const toggleMute = async () => {
    if (sound !== null) {
      await sound.setVolumeAsync(!isMuted ? 0 : 1);
    }
    setIsMuted(() => !isMuted);
  };
  return (
    <View className="mb-2 rounded-3xl overflow-hidden">
      {/* Background Video */}
      <Video
        ref={video}
        className=""
        style={{height: screenHeight, width: screenWidth}}
        source={{uri: item.video}}
        posterStyle={{resizeMode: 'contain', height: '100%', width: '100%'}}
        usePoster={true}
        posterSource={{uri: item.song_picture}}
        shouldPlay={Math.round(selectedIndex) == index ? true : false}
        resizeMode={ResizeMode.COVER}
        isLooping={true}
        isMuted={true}
        useNativeControls={false}
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      {/* Button & Options on the front */}
      <View
        className="absolute bg-none z-0"
        style={{height: screenHeight, width: screenWidth}}>
        <View className="flex-1 w-[94%] mx-auto justify-end">
          <View className="self-end items-center justify-evenly h-2/6">
            <View>
              <TouchableOpacity>
                <Image
                  className="rounded-full w-14 h-14"
                  source={followImage}
                />
                <View className="absolute bg-secondary rounded-full left-5 top-11">
                  <Ionicons name="add" size={18} color="black" />
                </View>
              </TouchableOpacity>
              <Text className="text-text self-center mt-2">265k</Text>
            </View>
            <TouchableOpacity onPress={toggleMute}>
              {isMuted ? (
                <Ionicons name="volume-mute-outline" size={34} color="white" />
              ) : (
                <Ionicons
                  name="volume-medium-outline"
                  size={34}
                  color="white"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="share-social-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View className="w-full h-[18%] max-h-[24%] px-2 mb-4 ">
            <View className="flex-row items-center">
              <Image
                source={{uri: item.song_picture}}
                className="rounded-md h-14 w-14"
              />
              <View className="flex-1 ml-4">
                <Text className="text-text text-2xl font-medium">
                  {item.song_name}
                </Text>
                <Text className="text-lightText">{item.artist_id}</Text>
              </View>
              <TouchableOpacity className="">
                <Ionicons name="add-circle-outline" size={38} color="white" />
              </TouchableOpacity>
            </View>

            <View className="my-4">
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={genreList.slice(0, 3)}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <Text className="text-text bg-tagsbtn3 p-3 rounded-3xl mx-1">
                      #{item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {soundDuration && Math.round(selectedIndex) == index ? (
              <ProgressBar songDuration={soundDuration} isGenre />
            ) : (
              ''
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default GenreSongVideoScreen;
