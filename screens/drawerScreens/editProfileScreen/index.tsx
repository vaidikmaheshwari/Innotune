import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import axios from 'axios';
import {ApiServices} from '../../../ApiServices';
import {updateUserRequest} from '../../../Redux/slices/LoginSlice';

type Props = {};

const EditProfileScreen = (props: Props) => {
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const {User, isLoading} = useAppSelector(
    state => state.rootReducer.LoginReducer,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setName(User?.user_info?.username ? User?.user_info?.username : '');
  }, []);
  const onSave = async () => {
    if (image) {
      dispatch(updateUserRequest({userToken: User?.token, name, image}));
    } else dispatch(updateUserRequest({userToken: User?.token, name}));
    // try{
    // const config={
    // headers:{
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization':`Token ${user?.token}`
    //     }
    // }
    // const formData = new FormData();
    // formData.append("username", name);
    // if(image){
    //     const localUri = image;
    //     const filename = localUri.split('/').pop();
    //     const match = /\.(\w+)$/.exec(filename);
    //     const type = match ? `image/${match[1]}` : `image`;
    //     formData.append('avatar', { uri: localUri, name: filename, type });
    // }
    // console.log(formData)
    // const response = await axios.put(ApiServices.EditProfileService,formData,config);
    // console.log(response.data)
    // dispatch(updateUser(response.data.data))
    // }catch(e){
    //     console.log(e.message)
    // }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('Image: ', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const headerRight = isLoading ? (
    <ActivityIndicator size="large" color="#fff" />
  ) : (
    'Save'
  );
  return (
    <BackGroundComponent>
      <View className="mt-12">
        <CustomLoginHeaderComponent
          plaintext="Edit profile"
          headerRight={headerRight}
          icon="close"
          headerRightEvent={onSave}
        />
        <View className="my-5 self-center ">
          <Image
            source={image ? {uri: image} : {uri: User?.user_info?.avatar}}
            className="h-32 w-32 rounded-full"
          />
          <TouchableOpacity
            className="bg-secondary rounded-sm w-8 p-1 absolute bottom-0 right-0"
            onPress={pickImage}>
            <Ionicons name="pencil-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center border-b-[1px] border-darkgrey mx-4 py-3">
          <Text className="text-text text-[16px] font-medium">Name</Text>
          <TextInput
            className="text-text text-[16px]  ml-12"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={'#D3D3D3'}
          />
        </View>
      </View>
    </BackGroundComponent>
  );
};

export default EditProfileScreen;
