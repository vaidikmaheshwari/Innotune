
import React, { useRef, useState} from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';

import { Entypo } from '@expo/vector-icons';

type Props = {};

const PlaylistBottomDrawer = ({setActive,selectedPlaylist}: any) => {
  console.log('playlist',selectedPlaylist);

  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  
  const [position, setPosition] = useState({x: 0, y: 0});
  let pos = 0;
  let dis;
  const screenHeight = Dimensions.get('window').height;
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > -200) {
        Animated.spring(pan, {
          toValue: {x: 0, y: -120},
          useNativeDriver: false,
        }).start();
      }
      Animated.event(
        [
          null,
          // (dis = gestureState.dy),
          {dy: pan.y}, // Update pan.x and pan.y with gesture
        ],
        {useNativeDriver: false}, // Set to false if not using native driver
      );
    },
    onPanResponderRelease: (evt, gestureState) => {
      setPosition({x: gestureState.x0, y: gestureState.y0});
      pos = gestureState.y0;

      console.log(position.y);
      if (position.y > pos) {
        setActive(false);
        // setPosition({x: 0, y: 100});
      }
      if (position.y < pos) {
        // setActive(false);
        // setPosition({x: 0, y: 100});
      }

      // Handle gesture release
    },
  });
  const bottomSheetHeight = pan.y.interpolate({
    inputRange: [-screenHeight / 6, -60],
    outputRange: [screenHeight, 200], // Minimum height and maximum height
    extrapolate: 'clamp', // Ensure the output value does not go beyond defined range
  });
  const bottomSheetTranslateY = pan.y.interpolate({
    inputRange: [-screenHeight / 6, -60],
    outputRange: [0, 1], // Minimum height and maximum height
    extrapolate: 'clamp', // Ensure the output value does not go beyond defined range
  });
   // playlist name , image, user ,public or private
  return (
    <>
    
      <View className="w-full h-full absolute  ">
        <View className="absolute bg-primary opacity-70 h-full w-full  "></View>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              height: bottomSheetHeight,
              transform: [{translateY: bottomSheetTranslateY}],
            },
          ]}
          {...panResponder.panHandlers}>
          <View className="h-1 w-12 bg-text rounded-3xl self-center mb-6 " />
          <View className='h-20 flex-row gap-5 mb-6'>
            <View>
              <Image source={{uri:selectedPlaylist.playlistImage}} className='h-14 w-14' />
            </View>
            <View className='flex-col align-middle'>
              <Text className='text-text text-xl'>{selectedPlaylist.playlistName}</Text>
               <View className='flex-row'>
               <Text className='text-lightgrey ' >{user?.user_info?.username}  </Text>
               <Entypo name="dot-single" size={24} color="#D3D3D3" />
               <Text className='text-lightgrey  '>{selectedPlaylist.isGlobal ? "public" : "private"}</Text>
               </View>
              
            </View>
          </View>
          <View className='gap-5'>
          <TouchableOpacity className="h-10 w-full "
           
          >
            <View className='flex-row gap-2 items-center'> 
            <MaterialIcons name="add-circle-outline" size={24} color="white" />
            <Text className="text-lg text-text">Add to this playlist</Text>
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity className="h-10 w-full " >
            <View className='flex-row gap-2 items-center'> 
            <Feather name="edit" size={24} color="white" />
            <Text className="text-lg text-text">Edit playlist</Text>
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity className="h-10 w-full " >
            <View className='flex-row gap-2 items-center'> 
            <MaterialCommunityIcons name="delete-sweep-outline" size={24} color="white" />
            <Text className="text-lg text-text">Delete playlist</Text>
            </View>
            
          </TouchableOpacity>
          

          
          <TouchableOpacity className="h-10 w-full " >
            <View className='flex-row gap-2 items-center'> 
            <AntDesign name="sharealt" size={24} color="white" />
            <Text className="text-lg text-text">Share</Text>
            </View>
            
          </TouchableOpacity>
          </View>
         
        </Animated.View>
      </View>
      
    </>
  );
};

export default PlaylistBottomDrawer;

const styles = StyleSheet.create({
  box: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#777777',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    paddingBottom: 300,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#282828',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: 5,
    padding: 20,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 5, // For iOS shadow
  },
 
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      justifyContent: 'center',
      alignItems: 'center',
    },

  
});
