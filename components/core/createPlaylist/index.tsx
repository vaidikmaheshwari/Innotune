import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import CustomLargeButtonComponent from '../../common/CustomLargeButtonComponent';
import {LinearGradient} from 'expo-linear-gradient';
import {useAppSelector} from '../../../Redux/hooks';
import axios from 'axios';
import {ApiServices} from '../../../ApiServices';
import {useNavigation} from '@react-navigation/native';

type Props = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePlayList = ({setModalVisible}: Props) => {
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const User = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const navigation = useNavigation();

  const createPlaylist = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${User?.token}`,
        },
      };
      const formData = new FormData();
      formData.append('playlist_name', playlistName);
      formData.append('user_id', User?.user_info?.id);
      //   const body = {
      //     playlist_name: playlistName,
      //     playlist_picture: '',
      //     is_global: false,
      //     user_id: User?.user_info?.id,
      //   };
      console.log('Header: ', config);
      console.log('Body: ', formData);
      console.log('Path: ', ApiServices.CreatePlaylistService);
      const response = await axios.post(
        ApiServices.CreatePlaylistService,
        formData,
        config,
      );
      console.log(response.data);
      navigation.navigate('PlayListScreen' as never, {
        uri: '',
        id: response.data.message.id,
        name: playlistName,
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <LinearGradient
      colors={['#d3d3d388', 'transparent']}
      end={{x: 0.5, y: 0.9}}
      className="flex-1 bg-primary ">
      <View className="absolute w-full h-full items-center">
        <View className="items-center mt-[70%] w-[85%]">
          <Text className="text-text font-medium text-xl mb-12">
            Give your playlist a name
          </Text>
          <TextInput
            className="font-medium text-3xl text-text w-full text-center border-b-[1px] border-grey p-1"
            placeholderTextColor={'#fff'}
            value={playlistName}
            onChangeText={setPlaylistName}
          />
          <View className="mt-12 flex-row w-60 ">
            <View className=" flex-1">
              <CustomLargeButtonComponent
                green={false}
                plaintext="Cancel"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View className="w-4" />
            <View className="flex-1">
              <CustomLargeButtonComponent
                green
                plaintext="Create"
                onPress={createPlaylist}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CreatePlayList;
