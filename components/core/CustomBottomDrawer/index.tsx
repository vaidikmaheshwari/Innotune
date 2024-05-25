import {useNavigation} from '@react-navigation/native';
import {log} from 'console';
import React, {useRef, useState} from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import CreatePlayList from '../createPlaylist';
import CreatePlaylistScreen from '../../../screens/editPlaylistScreen';

const CustomBottomDrawer = ({setActive}: any) => {
  const navigation = useNavigation();
  const [createPlaylistModalVisible, setCreatePlaylistModalVisible] =
    useState(false);
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

  return (
    <>
      <View className="w-full h-full absolute ">
        <View className="absolute bg-primary opacity-70 h-full w-full "></View>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              height: bottomSheetHeight,
              transform: [{translateY: bottomSheetTranslateY}],
            },
          ]}
          {...panResponder.panHandlers}>
          <View className="h-2 w-12 bg-text rounded-3xl self-center mb-6" />
          <TouchableOpacity
            className="h-10 w-full"
            onPress={() => setCreatePlaylistModalVisible(true)}>
            <Text className="text-xl text-text">Add PlayList</Text>
          </TouchableOpacity>
          <View className="h-10 w-full">
            <Text className="text-xl text-text">Colab with Friends</Text>
          </View>
        </Animated.View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={createPlaylistModalVisible}
        onRequestClose={() => {
          setCreatePlaylistModalVisible(!createPlaylistModalVisible);
        }}>
        <CreatePlayList setModalVisible={setCreatePlaylistModalVisible} />
      </Modal>
    </>
  );
};

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
});

export default CustomBottomDrawer;
