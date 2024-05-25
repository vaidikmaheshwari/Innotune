import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type Props = {
  item: {
    playListName: string;
    totalSongs: number;
    playlistImage: any;
    totalSingers: string;
    songlist: {
      audio: any;
      video: any;
      image: any;
      songName: string;
      singer: string;
      finish: number;
    }[];
  };
};
const HomeVideoComponent = forwardRef((props: Props, parentRef: any) => {
  // const songs = item.songlist.slice(0, 5);
  const ref = useRef(null);
  useImperativeHandle(parentRef, () => ({
    play,

    stop,
    unload,
  }));
  useEffect(() => {
    return () => {
      unload();
    };
  }, []);

  const play = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await ref.current.playAsync();
    } catch (e) {
      console.log('e->', e);
    }
  };
  const stop = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync();
    } catch (e) {
      console.log('e->', e);
    }
  };
  const unload = async () => {
    if (ref.current == null) {
      return;
    }

    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log('e->', e);
    }
  };
  // const [isFocused, setIsFocused] = useState(false);
  // const [content, setContent] = useState<any>(songs);
  // const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [loop, setLoop] = useState<boolean>(false);
  // const [soundDuration, setSoundDuration] = useState<number>(0);
  // const progress = useRef(new Animated.Value(0)).current;
  // const [isMuted, setIsMuted] = useState<boolean>(false);
  // const [sound, setSound] = useState();
  // const video = useRef(null);

  // useEffect(() => {
  //   (async () => {
  //     console.log('Loading Sound');
  //     const {sound} = await Audio.Sound.createAsync(song, {isLooping: true});
  //     setSound(sound);
  //     console.log('Playing Sound');
  //     await sound.playAsync();
  //     const soundInfo = await sound.getStatusAsync();
  //     setSoundDuration(soundInfo.durationMillis);
  //   })();
  // }, []);
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  // const start = () => {
  //   Animated.timing(progress, {
  //     toValue: 1,
  //     duration: 5000,
  //     useNativeDriver: false,
  //   }).start(({finished}) => {
  //     if (finished) {
  //       if (loop && currentIndex == 0) {
  //         next();
  //       }
  //       next();
  //     } else {
  //       // console.log('notfired');
  //     }
  //   });
  // };
  // const next = () => {
  //   if (currentIndex < songs.length - 1) {
  //     let tempData = [...songs]; // Create a new array
  //     tempData[currentIndex].finish = 0;
  //     setContent(tempData);
  //     progress.setValue(0);
  //     // console.log('=====> vapas aaya firs mein');
  //     // console.log(currentIndex);

  //     setCurrentIndex(prevIndex => prevIndex + 1);
  //   } else if (currentIndex >= songs.length - 1) {
  //     let tempData = [...songs]; // Create a new array
  //     tempData[currentIndex].finish = 0;

  //     // console.log('=====> vapas aaya last mein');
  //     console.log(currentIndex);

  //     // tempData.map(obj => (obj.finish = 0));
  //     setContent(tempData);

  //     progress.setValue(0);

  //     setLoop(true);

  //     start();
  //     setCurrentIndex(() => 0);
  //   }
  // };

  // const previous = () => {
  //   if (currentIndex - 1 >= 0) {
  //     let tempData = [...songs]; // Create a new array
  //     tempData[currentIndex].finish = 0;
  //     setContent(tempData);
  //     progress.setValue(0);
  //     setCurrentIndex(prevIndex => prevIndex - 1);
  //   } else {
  //     let tempData = [...songs]; // Create a new array
  //     tempData[currentIndex].finish = 0;
  //     setContent(tempData);
  //     progress.setValue(0);
  //     setCurrentIndex(0);
  //   }
  // };

  return (
    // <View className={`w-[90%]  mx-auto bg-accent rounded-3xl  my-5 h-[450]`}>
    //   <View className="w-[100%] h-[100%]">
    //     {/* audio chlti rhegi on background */}

    //     {/* ek btn jo audio ko mute/unmute krta rhega  */}
    //     {/* ek view ek img ek song for baackground and slide */}
    //     <View className="">
    //       <Video
    //         ref={video}
    //         className="h-[100%] w-[100%] rounded-xl "
    //         source={songs[currentIndex].video}
    //         useNativeControls={false}
    //         posterStyle={{resizeMode: 'cover', height: '100%', width: '100%'}}
    //         usePoster={true}
    //         posterSource={songs[currentIndex].image}
    //         shouldPlay={false}
    //         isMuted={true}
    //         isLooping={true}
    //         resizeMode={ResizeMode.COVER}
    //         onLoadStart={() => {
    //           progress.setValue(0);
    //           start();
    //         }}

    //         // onPlaybackStatusUpdate={status => setStatus(() => status)}
    //       />
    //     </View>
    //     <View className="absolute w-[100%] h-[100%]   ">
    //       <View className="flex-row">
    //         <View className="ml-[5%] mt-[10%] w-[80%] justify-evenly items-center flex-row ">
    //           {songs.map((obj, index) => {
    //             return (
    //               <View
    //                 className="flex-1 h-[3px] mx-[0.9] bg-secondary opacity-50 flex-row rounded-full "
    //                 key={index}>
    //                 <Animated.View
    //                   style={{
    //                     flex:
    //                       currentIndex == index
    //                         ? progress
    //                         : songs[index].finish,
    //                     backgroundColor: 'rgba(255,255,255,1)',
    //                     height: 3,
    //                   }}></Animated.View>
    //               </View>
    //             );
    //           })}
    //         </View>
    //         <View>
    //           <TouchableOpacity
    //             className=" ml-4 top-7"
    //             onPress={() => setIsMute(prevState => !prevState)}>
    //             {isMute ? (
    //               <Octicons name="mute" size={24} color="black" />
    //             ) : (
    //               <Octicons name="unmute" size={24} color="black" />
    //             )}
    //           </TouchableOpacity>
    //         </View>
    //       </View>

    //       <View className="w-[100%] h-[65%]  top-4 flex-row justify-between">
    //         <TouchableOpacity
    //           className="w-1/2  h-[100%] "
    //           onPress={() => {
    //             previous();
    //           }}>
    //           <View className="w-1/2 h-[100%] "></View>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           className="w-1/2 h-[100%] "
    //           onPress={() => {
    //             next();
    //           }}>
    //           <View className="w-1/2 h-[100%] "></View>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // </View>
    <>
      <View></View>
      {/* <Video
        style={{flex: 1}}
        ref={ref}
        source={require('../../../assets/song2Video.mp4')}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        isLooping
      /> */}
    </>
  );
});

export default HomeVideoComponent;
