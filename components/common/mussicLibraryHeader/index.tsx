import {View, Text, Pressable, Image, Animated, Easing} from 'react-native';
import React, {useRef, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import HomeHeaderBtn from '../../core/HomeHeaderBtn';
import {Entypo} from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {useAppSelector} from '../../../Redux/hooks';

type Props = {
  setActive: any;
};

const MusicLibraryHeader = ({setActive}: Props) => {
  const btn1 = useRef(new Animated.Value(0));
  const btn2 = useRef(new Animated.Value(85));
  const btn3 = useRef(new Animated.Value(165));
  const btn4 = useRef(new Animated.Value(265));
  const [btn1pressed, setBtn1pressed] = useState<boolean>(false);
  const [btn2pressed, setBtn2pressed] = useState<boolean>(false);
  const [btn3pressed, setBtn3pressed] = useState<boolean>(false);
  const [btn4pressed, setBtn4pressed] = useState<boolean>(false);
  const [cross, setCross] = useState<boolean>(false);
  const [btn1IsShowing, setBtn1IsShowing] = useState<boolean>(true);
  const [btn2IsShowing, setBtn2IsShowing] = useState<boolean>(true);
  const [btn3IsShowing, setBtn3IsShowing] = useState<boolean>(true);
  const [btn4IsShowing, setBtn4IsShowing] = useState<boolean>(true);

  const traverse = (posX: Animated.Value) => {
    console.log(posX);

    Animated.spring(posX, {
      friction: 100,
      toValue: 25,
      useNativeDriver: true,
      delay: 0,
    }).start(() => {
      console.log('finished');
    });
    console.log('fired');
  };
  const traverseBack = (
    posX: Animated.Value,
    toValue:
      | number
      | Animated.Value
      | Animated.ValueXY
      | {x: number; y: number}
      | Animated.RgbaValue
      | Animated.AnimatedColor
      | Animated.AnimatedInterpolation<number>,
  ) => {
    console.log(posX);

    Animated.sequence([
      Animated.spring(posX, {
        speed: 40,
        toValue: toValue,
        useNativeDriver: true,

        delay: 0,
      }),
      // Animated.timing(posX, {
      //   toValue: 1,
      //   duration: 1000,
      //   useNativeDriver: true,
      // }),
    ]).start(() => {
      setBtn1IsShowing(true);
      setBtn2IsShowing(true);
      setBtn3IsShowing(true);
      setBtn4IsShowing(true);
      setBtn1pressed(false);
      setBtn2pressed(false);
      setBtn3pressed(false);
      setBtn4pressed(false);
    });

    console.log('fired');
  };

  function btn1Handler() {
    setBtn1pressed(true);
    setBtn2pressed(false);
    setBtn3pressed(false);
    setBtn4pressed(false);
    setBtn1IsShowing(true);
    setBtn2IsShowing(false);
    setBtn3IsShowing(false);
    setBtn4IsShowing(false);
    traverse(btn1.current);
    setCross(true);
  }
  function btn2Handler() {
    setBtn1pressed(false);
    setBtn2pressed(true);
    setBtn3pressed(false);
    setBtn4pressed(false);
    setBtn1IsShowing(false);
    setBtn2IsShowing(true);
    setBtn3IsShowing(false);
    setBtn4IsShowing(false);
    setCross(true);
    traverse(btn2.current);
  }
  function btn3Handler() {
    setBtn1pressed(false);
    setBtn2pressed(false);
    setBtn3pressed(true);
    setBtn4pressed(false);
    setBtn1IsShowing(false);
    setBtn2IsShowing(false);
    setBtn3IsShowing(true);
    setBtn4IsShowing(false);
    traverse(btn3.current);
    setCross(true);
  }

  function btn4Handler() {
    setBtn1pressed(false);
    setBtn2pressed(false);
    setBtn4pressed(true);
    setBtn3pressed(false);
    setBtn1IsShowing(false);
    setBtn2IsShowing(false);
    setBtn3IsShowing(false);
    setBtn4IsShowing(true);
    traverse(btn4.current);
    setCross(true);
  }
  const navigation = useNavigation()
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  return (
    <View className="mt-5">
      <View className="flex-row justify-between h-auto items-center my-9 mx-3 ">
        <View className="flex-row gap-4">
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View>
              <Image
                source={{uri: user?.user_info?.avatar}}
                className="h-8 w-8 rounded-full"
              />
            </View>
          </Pressable>
          <Text className=" text-2xl text-text font-black">Your Library</Text>
        </View>
        <View className="flex-row gap-3 items-center">
          <Ionicons name="search" size={30} color="white" />
          <Pressable onPress={() => setActive(true)}>
            <Ionicons name="add" size={34} color="white" />
          </Pressable>
        </View>
      </View>
      <View className="flex-row mx-3 items-center absolute top-24 h-8">
        {cross ? (
          <Pressable
            onPress={() => {
              if (btn1IsShowing) {
                traverseBack(btn1.current, 0);
                setCross(false);
              }
              if (btn2IsShowing) {
                traverseBack(btn2.current, 85);
                setCross(false);
              }
              if (btn3IsShowing) {
                traverseBack(btn3.current, 165);
                setCross(false);
              }
              if (btn4IsShowing) {
                traverseBack(btn4.current, 265);
                setCross(false);
              }
            }}>
            <Entypo name="circle-with-cross" size={24} color="white" />
          </Pressable>
        ) : null}
        {btn1IsShowing ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: 1,
              bottom: 1,

              transform: [
                {
                  translateX: btn1.current,
                },
              ],
            }}>
            <HomeHeaderBtn
              btnTxt="Playlist"
              btnHandler={btn1Handler}
              isActive={btn1pressed}
            />
          </Animated.View>
        ) : null}
        {btn2IsShowing ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: 1,
              bottom: 1,
              transform: [{translateX: btn2.current}],
            }}>
            <HomeHeaderBtn
              btnTxt="Songs"
              btnHandler={btn2Handler}
              isActive={btn2pressed}
            />
          </Animated.View>
        ) : null}
        {btn3IsShowing ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: 1,
              bottom: 1,
              transform: [{translateX: btn3.current}],
            }}>
            <HomeHeaderBtn
              btnTxt="Podcasts"
              btnHandler={btn3Handler}
              isActive={btn3pressed}
            />
          </Animated.View>
        ) : null}
        {btn4IsShowing ? (
          <Animated.View
            style={{
              position: 'absolute',
              top: 1,
              bottom: 1,
              transform: [{translateX: btn4.current}],
            }}>
            <HomeHeaderBtn
              btnTxt="Liked"
              btnHandler={btn4Handler}
              isActive={btn4pressed}
            />
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

export default MusicLibraryHeader;
