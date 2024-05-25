import {useNavigation} from '@react-navigation/native';
import {log} from 'console';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {TextInput} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {ApiServices} from '../../../ApiServices';
import axios from 'axios';
import {addLikedSong, removeLikeSong} from '../../../Redux/slices/LoginSlice';

type Props = {};

const SongBottomDrawer = ({setActive, selectedItem}: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  console.log('seSelectedItem->', selectedItem);
  const songId = selectedItem.id;
  console.log('songId', songId);
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  // console.log('user->', user?.user_info?.id);
  const [modalVisable, setModaVisable] = useState<boolean>(false);
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const [selectedImage, setSelectedImage] = useState<any>();
  const [colabName, setColabName] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<any>();
  const [selectedAudio, setSelectedAudio] = useState<any>();
  const [audioDuration, setAudioDuration] = useState<any>();
  const [loaderVisible, setLoaderVisable] = useState<boolean>(false);
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
  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result);
    }
  };
  const handleVideoPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result);
    }
  };

  const handleAudioPicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    });

    if (!result.canceled) {
      setSelectedAudio(result);
    }
  };
  const handleAddLikedSongs = async () => {
    const LikedSongs = user?.liked_songs?.id;
    console.log('Liked Songs', LikedSongs);
    if (LikedSongs?.includes(selectedItem.id)) {
      ToastAndroid.showWithGravity(
        'Already Added ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    } else {
      setLoaderVisable(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user?.token}`,
        },
      };
      const data = {
        song_id: selectedItem.id,
        user_id: user?.user_info?.id,
      };
      try {
        const response = await axios.post(
          ApiServices.LikeSongService,
          data,
          config,
        );
        console.log(response.status);
        if (response.status == 201) {
          setLoaderVisable(false);
          dispatch(addLikedSong(selectedItem.id));
          ToastAndroid.showWithGravity(
            'Added succesfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      } catch (err) {
        setLoaderVisable(false);
        console.log(err);
      }
    }
  };
  const handleColab = async () => {
    if (!colabName && !selectedAudio && !selectedVideo && !selectedImage) {
      Alert.alert('Please fill the all fields');
      return;
    }
    setLoaderVisable(true);

    const formData = new FormData();
    console.log('id', user?.user_info?.id);
    console.log('song', selectedItem.id);
    console.log('colabname', colabName);
    formData.append('user_id', user?.user_info?.id);
    formData.append('song_id', selectedItem.id);
    formData.append('colab_name', colabName);

    console.log('audioURL->>>', selectedAudio.assets[0].uri);
    console.log('audioName->>', selectedAudio.assets[0].name);
    console.log('audioPart', selectedAudio.assets[0].mimeType);
    formData.append('audio', {
      uri: selectedAudio.assets[0].uri,
      name: selectedAudio.assets[0].name,
      type: selectedAudio.assets[0].mimeType,
    });

    formData.append('video', {
      uri: selectedVideo.assets[0].uri,
      name: selectedVideo.assets[0].fileName,
      type: selectedAudio.assets[0].mimeType,
    });
    const imageName = selectedImage.assets[0].uri.split('/').pop();
    const imagePart = /\.(\w+)$/.exec(imageName);

    formData.append('colab_picture', {
      uri: selectedImage.assets[0].uri,
      name: imageName,
      type: `image/${imagePart[1]}`,
    });
    console.log('formData->', formData);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${user?.token}`,
        },
      };
      console.log(ApiServices.AddColabService);
      const response = await axios.post(
        ApiServices.AddColabService,
        formData,
        config,
      );
      console.log(response);
      if (response.status == 201) {
        setLoaderVisable(false);
        ToastAndroid.showWithGravity(
          'Added successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setColabName('');
        setSelectedAudio(null);
        setSelectedImage(null);
        setSelectedVideo(null);
      }
    } catch (err) {
      setLoaderVisable(false);
      console.log(err.message);
    }
  };
  const handleRemoveLikedSong = async () => {
    const LikedSongs = user?.liked_songs?.id;
    console.log('Liked Songs', LikedSongs);
    if (LikedSongs?.includes(selectedItem.id)) {
      setLoaderVisable(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user?.token}`,
        },
        data: {
          song_id: selectedItem.id,
          user_id: user?.user_info?.id,
        },
      };
      try {
        const response = await axios.delete(
          ApiServices.LikeSongService,
          config,
        );
        console.log(response.status);
        if (response.status == 200) {
          setLoaderVisable(false);
          dispatch(removeLikeSong(selectedItem.id));
          ToastAndroid.showWithGravity(
            'Remove succesfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      } catch (err) {
        setLoaderVisable(false);
        console.log(err);
      }
    } else {
      ToastAndroid.showWithGravity(
        'Please add a song to your favorites ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
  };
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
          <View className="h-20 flex-row gap-5 mb-6">
            <View>
              <Image
                source={{uri: selectedItem.imageUrl}}
                className="h-14 w-14"
              />
            </View>
            <View className="flex-col align-middle">
              <Text className="text-text text-xl">{selectedItem.name}</Text>
              <Text className="text-lightgrey text-base">
                {selectedItem.album}
              </Text>
            </View>
          </View>
          <View className="gap-5">
            <TouchableOpacity
              className="h-10 w-full "
              onPress={() => handleAddLikedSongs()}>
              <View className="flex-row gap-2 items-center">
                <Image
                  source={require('../../../projectAssets/likedSongs.png')}
                  className="h-6 w-6"
                />
                <Text className="text-lg text-text">Add to Liked Songs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-10 w-full "
              onPress={() => handleRemoveLikedSong()}>
              <View className="flex-row gap-2 items-center">
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="white"
                />
                <Text className="text-lg text-text">
                  Remove from Liked Songs
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="h-10 w-full ">
              <View className="flex-row gap-2 items-center">
                <Ionicons name="folder-outline" size={24} color="white" />
                <Text className="text-lg text-text">View Album</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-10 w-full "
              onPress={() => {
                setModaVisable(true);
              }}>
              <View className="flex-row gap-2 items-center">
                <Feather name="music" size={24} color="white" />
                <Text className="text-lg text-text">Colab</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-10 w-full "
              onPress={() =>
                navigation.navigate('ColabList' as never, {songId: songId})
              }>
              <View className="flex-row gap-2 items-center">
                <SimpleLineIcons name="playlist" size={24} color="white" />
                <Text className="text-lg text-text">Colab list</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="h-10 w-full ">
              <View className="flex-row gap-2 items-center">
                <FontAwesome name="user-o" size={24} color="white" />
                <Text className="text-lg text-text pl-1">View Artist</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="h-10 w-full ">
              <View className="flex-row gap-2 items-center">
                <AntDesign name="sharealt" size={24} color="white" />
                <Text className="text-lg text-text">Share</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      <Modal
        visible={modalVisable}
        onRequestClose={() => {
          setModaVisable(false);
        }}>
        <View className="bg-primary h-[100%] w-[100%]">
          <View className="w-[100%]">
            <View className="mx-auto mt-10">
              <Text className="text-text text-2xl ">Add colab</Text>
            </View>
            <View>
              <View className="">
                <TextInput
                  placeholder="Enter colab name..."
                  value={colabName}
                  onChangeText={setColabName}
                  placeholderTextColor="#D3D3D3"
                  className="w-[95%] border-[1px] border-secondary mx-auto text-secondary p-2 rounded-lg text-lg mb-5 mt-5"
                />
                <TouchableOpacity
                  className="w-[95%] border-[1px] border-secondary mx-auto text-secondary p-2 rounded-lg text-lg mb-5 mt-5"
                  onPress={handleImagePicker}>
                  {selectedImage ? (
                    <Text className="text-text text-lg">
                      {selectedImage.assets[0].uri.split('/').pop().length > 30
                        ? selectedImage.assets[0].uri
                            .split('/')
                            .pop()
                            .slice(0, 30) + '...jpg'
                        : selectedImage.assets[0].uri.split('/').pop()}
                    </Text>
                  ) : (
                    <Text className="text-lightgrey text-lg">
                      Select Image{' '}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-[95%] border-[1px] border-secondary mx-auto text-secondary p-2 rounded-lg text-lg mb-5 mt-5"
                  onPress={() => handleVideoPicker()}>
                  {selectedVideo ? (
                    <Text className="text-text text-lg">
                      {selectedVideo.assets[0].fileName.length > 30
                        ? selectedVideo.assets[0].fileName.slice(0, 30) +
                          '...mp4'
                        : selectedVideo.assets[0].fileName}
                    </Text>
                  ) : (
                    <Text className="text-lightgrey text-lg">
                      Select Video{' '}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-[95%] border-[1px] border-secondary mx-auto text-secondary p-2 rounded-lg text-lg mb-5 mt-5"
                  onPress={() => handleAudioPicker()}>
                  {selectedAudio ? (
                    <Text className="text-text text-lg">
                      {selectedAudio.assets[0].name.length > 30
                        ? selectedAudio.assets[0].name.slice(0, 30) + '...mp3'
                        : selectedAudio.assets[0].name}
                    </Text>
                  ) : (
                    <Text className="text-lightgrey text-lg">
                      Select Audio{' '}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="mx-auto bg-green px-5 py-2 rounded-3xl"
                onPress={handleColab}>
                <Text className="text-primary text-lg">Add colab</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={loaderVisible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </>
  );
};

export default SongBottomDrawer;

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
