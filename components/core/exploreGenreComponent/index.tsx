import {View, Text, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';
import {Video, ResizeMode} from 'expo-av';

type Props = {
  genre: {
    name: string;
    videoUrl: string;
    songPoster: string;
  };
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

const ExploreGenreComponent = ({genre, onPress}: Props) => {
  console.log('Explore Genre Component: ', genre);
  return (
    <Pressable className="rounded-xl   w-[30%] h-56" onPress={onPress}>
      <Text className="text-secondary absolute z-10 bottom-3 left-2 font-medium w-3/4">
        #{genre.name}
      </Text>
      <Video
        className="h-full w-full rounded-xl "
        source={{uri: genre.videoUrl}}
        useNativeControls={false}
        posterStyle={{resizeMode: 'cover', height: '100%', width: '100%'}}
        usePoster={true}
        posterSource={{uri: genre.songPoster}}
        shouldPlay={true}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        isLooping={true}
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </Pressable>
  );
};

export default ExploreGenreComponent;
