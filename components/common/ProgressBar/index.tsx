import React, {useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {MusicContext} from '../../../context/MusicPlayerProvider';
import {ApiServices} from '../../../ApiServices';
import axios from 'axios';
import {goTonextSong} from '../../../Redux/slices/musicPlayerQueueSlice';
import {setLink, setPlayEvent} from '../../../Redux/slices/MusicPlayerSlice';

type ProgressProps = {
  songDuration: number;
  isMusic?: boolean;
  isGenre?: boolean;
  // currentPosition: any;
  // setCurrentPosition: any;
  noRepeat?: boolean;
};
let i = 0;
export const ProgressBar = React.memo(
  ({
    songDuration,
    isMusic,
    noRepeat,
    isGenre,
  }: // currentPosition,
  // setCurrentPosition,
  ProgressProps) => {
    const musicLink = useAppSelector(state => state.rootReducer.musicPlayer);
    const {currentPosition, setCurrentPosition} =
      React.useContext(MusicContext);
    const pos = currentPosition;
    const firstRender = useRef(true);
    React.useEffect(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      setCurrentPosition(0);
      animatedValue.setValue(0);
      animateProgressBar();
      console.log('******* I am not supposed to log here !!!');
    }, [musicLink.musicPlayerLink]);
    // reference.current = pauseAnimation;
    const boxRef = useRef(null);
    const isPaused = useAppSelector(
      state => state.rootReducer.musicPlayer.isPaused,
    );
    const animatedValue = useRef(new Animated.Value(pos)).current;

    // const Interval = setInterval(() => {
    //   time += 2000;
    //   if (boxRef.current) {
    //     boxRef.current.measure((x, y, width, height, pageX, pageY) => {
    //      setCurrentPosition && setCurrentPosition(pageX);
    //     });
    //   }
    //   if (time >= songDuration) {
    //     clearInterval(Interval);
    //   }
    // }, 5000);

    const translateX = animatedValue.interpolate({
      inputRange: [0, 355],
      outputRange: [0, 355],
    });

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        Animated.event(
          [null], // Capture movement in the x-direction
          {useNativeDriver: false},
        ),
          setCurrentPosition && setCurrentPosition(gestureState.moveX);
      },
      onPanResponderRelease: (event, gestureState) => {
        console.log(
          gestureState.x0 +
            '================================================================',
        );

        // animatedValue = new Animated.Value(gestureState.x0);
        setCurrentPosition && setCurrentPosition(gestureState.x0);
        // Handle release if needed
      },
    });
    const [responseData, setResponseData] = useState();
    const dispatch = useAppDispatch();

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
    const nextSong = useAppSelector(
      state => state.rootReducer.MusicPlayerQueueReducer,
    );
    const nextSongIndex = nextSong.currIndex + 1;
    const prevSongIndex = nextSong.currIndex - 1;
    const animateProgressBar = () => {
      Animated.timing(animatedValue, {
        toValue: 360,
        duration: isMusic ? musicLink.duration * 1000 : songDuration,
        useNativeDriver: false,
      }).start(({finished}) => {
        if (!noRepeat) {
          animatedValue.setValue(0); // Reset the animated value
          animateProgressBar(); // Start the animation again
        }
        if (finished && nextSong.currIndex < nextSong.totalIndex - 1) {
          postRecentSong();
          dispatch(
            setLink({
              link: nextSong.songsList[nextSongIndex].audio,
              duration: nextSong.songsList[nextSongIndex].audio_duration,
              song_name: nextSong.songsList[nextSongIndex].song_name,
              image: nextSong.songsList[nextSongIndex].song_picture,
              video: nextSong.songsList[nextSongIndex].video,
              song_credits: nextSong.songsList[nextSongIndex].credits,
              id: nextSong.songsList[nextSongIndex].id,
            }),
          );
          dispatch(goTonextSong());
          dispatch(setPlayEvent());
        }
        // Restart the animation when it finishes
      });
    };

    const pauseAnimation = () => {
      // Pause the animation
      animatedValue.stopAnimation(value => {
        if (setCurrentPosition !== null) {
          setCurrentPosition && setCurrentPosition(value);
        }
        console.log('Current position:', value);
      });
    };

    useEffect(() => {
      animateProgressBar();
      console.log('======> use Effect fires');
    }, []);
    useEffect(() => {
      console.log(
        '======> use Effect fires=====================================',
      );
    }, []);
    if (isGenre === true) {
      console.log('======================isGenre is true');
    } else {
      useEffect(() => {
        const listener = animatedValue.addListener(({value}) => {
          if (setCurrentPosition !== null) {
            setCurrentPosition && setCurrentPosition(value);
          }

          // You can access the current value of the animated value here
          // Update UI or perform any action based on the animated value

          // For example, you can get the position of the ref using measure
        });

        return () => {
          // Remove the listener when the component unmounts
          animatedValue.removeListener(listener);
        };
      }, []);
    }

    useEffect(() => {
      if (isPaused) {
        console.log('fire karo');

        pauseAnimation();
      }
      if (!isPaused) {
        animateProgressBar();
        console.log(
          '===============================useEffect 2 ============================',
        );
      }
    }, [isPaused]);
    return (
      <>
        <View className="h-[4] w-[100%] rounded-xl bg-lightText overflow-hidden justify-center overflow-y-visible">
          <Animated.View
            ref={boxRef}
            style={[
              styles.bar,
              {
                transform: [
                  {
                    translateX: animatedValue,
                  },
                ],
              },
            ]}
            // {...panResponder.panHandlers}
          />
        </View>
        {isMusic ? (
          <Animated.View
            className="h-[10] w-[10] absolute bg-text rounded-full "
            style={{
              transform: [
                {
                  translateX: animatedValue,
                },
              ],
            }}
          />
        ) : null}
      </>
    );
  },
);
const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: 4,
    backgroundColor: '#777777',
  },
});
