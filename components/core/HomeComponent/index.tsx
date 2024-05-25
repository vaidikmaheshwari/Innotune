import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomHomeFlatList from '../CustomHomeFlatlist';

import SearchGenreComponent from '../searchGenreComponent';
import HomeRecentComponent from '../homeRecentComponent';
import {Video} from 'expo-av';
import HomeVideoComponent from '../HomeVideoComponent';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import axios from 'axios';
import {ApiServices} from '../../../ApiServices';
import {useNavigation} from '@react-navigation/native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'expo-linear-gradient';

interface Item {
  key: string;
}
type Props = {};
interface HomeVideoComponentRef {
  play: () => void;
  stop: () => void;
}
const staticData = [
  {
    id: 1,
    playlist_picture:
      'https://images.pexels.com/photos/8038906/pexels-photo-8038906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    playlist_name: 'Recent Songs',
  },
  {
    id: 2,
    playlist_picture:
      'https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg',
    playlist_name: 'Liked Songs',
  },
];
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const {height: screenHeight} = Dimensions.get('window');
// const VIDEO_HEIGHT_THRESHOLD = screenHeight * 0.3;
const HomeComponent = (props: Props) => {
  const navigation = useNavigation();
  const data1 = [1];
  const [isScroll, setIsScroll] = useState<boolean>(true);

  const mediaRef = useRef([]);
  const [responseData, setResponseData] = useState<any>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const getData = async () => {
    const config = {
      headers: {
        Authorization: `Token ${user?.token}`,
      },
    };
    try {
      // console.log('Hello!');
      const response = await axios.get(
        ApiServices.GlobalPlaylistService,
        config,
      );
      console.log(response.data);
      setResponseData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // const [isVisible, setIsVisible] = useState<boolean>(false);
  // const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);

  // const [playVideo, setPlayVideo] = useState<boolean>(false);
  // const flatListref = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({changed}: {changed: ViewToken[]}) => {
    console.log('Changed', changed);
    changed.forEach(element => {
      const cell = mediaRef.current[element.key];
      if (cell) {
        console.log('onViewableItemsChanged', element, element.isViewAble);
        if (element.isViewable) {
          cell.play();
          console.log('==============>' + 'video Playing');
        } else {
          cell.stop();
        }
      }
    });
  });
  const renderItem = ({item, index}: {item: Item; index: number}) => (
    <View
      style={[
        {
          flex: 1,
          marginBottom: 50,
          height: Dimensions.get('window').height - 300,
        },
        // index % 2 == 0 ? {backgroundColor: 'blue'} : {backgroundColor: 'pink'},
      ]}>
      {/* <HomeVideoComponent
        ref={HomeRef =>
          (mediaRef.current[item.key] = HomeRef as HomeVideoComponentRef)
        }
      /> */}
    </View>
  );
  // const componentRef = useRef<View>(null);
  // const handleScroll = (event: any) => {
  //   const yOffset = event.nativeEvent.contentOffset.y;
  //   const index = Math.floor(yOffset / (screenHeight * 0.5));
  //   console.log('yoffset->', yOffset);
  //   if (index !== currentItemIndex) {
  //     setCurrentItemIndex(index);
  //     console.log('index->', index);
  //     flatListref.current?.scrollToIndex({animated: true, index: index + 1});
  //   }
  // };
  // useEffect(() => {
  //   const calculateVisibility = () => {
  //     const eightyPercentHeight = 0.73 * screenHeight;

  //     if (componentRef.current) {
  //       componentRef.current.measure(
  //         (_x, _y, _width, _height, pageX, pageY) => {
  //           console.log('pageY=>', pageY);

  //           if (pageY < eightyPercentHeight) {
  //             setIsVisible(true);
  //           } else {
  //             setIsVisible(false);
  //           }
  //         },
  //       );
  //     }
  //   };

  //   calculateVisibility();

  //   const handleLayoutChange = () => {
  //     const newScreenHeight = Dimensions.get('window').height;
  //     setScreenHeight(newScreenHeight);
  //   };

  //   const dimensionsListener = Dimensions.addEventListener(
  //     'change',
  //     handleLayoutChange,
  //   );

  //   return () => {
  //     dimensionsListener.remove();
  //   };
  // }, [screenHeight]);
  // const handleFocus = () => {
  //   if (componentRef.current) {
  //     componentRef.current.focus();
  //   }
  // };

  const handleScroll = (event: any) => {
    // Access scroll event data
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    // console.log('Scroll Offset: ', contentOffset);
    // console.log('Content Size: ', contentSize);
    // console.log('Layout Measurement: ', layoutMeasurement);
  };
  const handleScrollFLATILIST = (event: any) => {
    // const activeItem = y / itemheight;
    // Access scroll event data
    // const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    // console.log('Scroll Offset RECT: ', contentOffset);
    // console.log('Content Size REACT: ', contentSize);
    // console.log('Layout Measurement REACT: ', layoutMeasurement);
  };

  return (
    <FlatList
      className="mt-5  mb-80"
      style={{height: screenHeight}}
      onScroll={handleScrollFLATILIST}
      ListHeaderComponent={
        <>
          <View className="w-[95%] mx-auto mb-4">
            <FlatList
              showsVerticalScrollIndicator={false}
              className="flex-1 mb-2 "
              numColumns={2}
              data={staticData}
              ItemSeparatorComponent={() => <View className="my-1 "></View>}
              renderItem={({item}) => {
                const handlePress = () => {
                  console.log('yee->>', item.playlist_name);

                  navigation.navigate('ListSongScreen' as never, {
                    headerTxt: item.playlist_name,
                  });
                };
                return (
                  <>
                    <HomeRecentComponent
                      item={item}
                      handlePress={handlePress}
                    />
                  </>
                );
              }}
            />
            {
              <FlatList
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="my-1 "></View>}
                className="flex-1  "
                numColumns={2}
                data={responseData ? responseData : [' ', ' ', ' ', ' ']}
                renderItem={({item}) => {
                  const handlePress = () => {
                    if (item != ' ') {
                      navigation.navigate('PlayListScreen' as never, {
                        id: item.id,
                        uri: item.playlist_picture,
                        name: item.playlist_name,
                      });
                    }
                  };
                  return (
                    <>
                      {item == ' ' ? (
                        <View className="w-[47%] ml-2  items-center border-text flex-row bg-darkgrey rounded-md">
                          <ShimmerPlaceholder
                            className="h-12 w-[25%] rounded-l-md "
                            shimmerColors={['#282828', '#383838', '#282828']}
                          />
                          <ShimmerPlaceholder
                            className="w-[70%] text-lightgrey pl-3"
                            shimmerColors={['#282828', '#383838', '#282828']}
                          />
                        </View>
                      ) : (
                        <HomeRecentComponent
                          item={item}
                          handlePress={handlePress}
                        />
                      )}
                    </>
                  );
                }}
              />
            }
          </View>
          <View className="gap-3 w-full ml-[0.4%] mb-1 ">
            <View>
              <Text className="text-xl text-text font-bold ">
                Your top mixes
              </Text>
              <CustomHomeFlatList responseData={responseData} />
            </View>
            <View>
              <Text className="text-xl text-text font-bold ">
                DJ - manan & prithu
              </Text>
              <CustomHomeFlatList responseData={responseData} />
            </View>
            <View>
              <Text className="text-xl text-text font-bold ">Daily hits</Text>
              <CustomHomeFlatList responseData={responseData} />
            </View>
            <View>
              <Text className="text-xl text-text font-bold ">Man ki aawaj</Text>
              <CustomHomeFlatList responseData={responseData} />
            </View>
            <View>
              <Text className="text-xl text-text font-bold ">
                Coding with me
              </Text>
              <CustomHomeFlatList responseData={responseData} />
            </View>
            <View>
              <Text className="text-xl text-text font-bold ">
                Your top mixes
              </Text>
              <CustomHomeFlatList responseData={responseData} />
            </View>
          </View>
        </>
      }
      data={data1}
      windowSize={1}
      maxToRenderPerBatch={2}
      removeClippedSubviews
      viewabilityConfig={{
        itemVisiblePercentThreshold: 0,
      }}
      // scrollEnabled={isScroll}
      // onMomentumScrollBegin={e => {
      //   if (e.nativeEvent.contentOffset.y > 1588) {
      //     setIsScroll(false);
      //   }
      //   console.log(e.nativeEvent.contentOffset.y);
      // }}
      overScrollMode="never"
      renderItem={renderItem}
      decelerationRate={'normal'}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
    // {/* <FlatList

    //   numColumns={1}
    //   data={HomePlaylist}
    //   onScrollEndDrag={() => {
    //     handleFocus();
    //   }}
    //   renderItem={({item}) => (
    //     <>
    //       <HomeVideoComponent item={item} ref={componentRef} />
    //     </>
    //   )}
    // /> */}
  );
};

export default HomeComponent;

// onScroll={(event) => {
//   const offset = event.nativeEvent.contentOffset.x;
//   const index = Math.floor(offset / screenWidth);
//   setCurrentItemIndex(index);
// }}
// onLayout={(event) => {
//   const { height } = event.nativeEvent.layout;
//   const videoHeight = screenHeight * 0.7;

//   if (height >= videoHeight) {
//     setCurrentItemIndex(index);
//   }
// }}
// const [currentItemIndex, setCurrentItemIndex] = useState(0);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const screenHeight = Dimensions.get('window').height;

//   useEffect(() => {
//     // Pause the video when it goes out of focus
//     const handleAppStateChange = (nextAppState) => {
//       if (nextAppState === 'inactive' || nextAppState === 'background') {
//         setIsVideoPlaying(false);
//       }
//     };

//     // Add event listener for app state changes
//     const subscription = AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const handleVideoPlayback = (isVisible, index) => {
//     if (isVisible && currentItemIndex === index) {
//       setIsVideoPlaying(true);
//       videoRef.current.playAsync();
//     } else {
//       setIsVideoPlaying(false);
//       videoRef.current.pauseAsync();
//     }
//   };
