import {
  View,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
  CustomLoginTextField,
} from '../../components';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {LoginContext} from '../../context/LoginProvider';
import {ApiServices} from '../../ApiServices';

type Props = {};
type BodyData = {
  username: string;
  email: string;
  password: string;
  avatar: string;
  is_artist: boolean;
};
const LoginGetUserNameScreen = (props: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {loginObj, setLoginObj} = useContext(LoginContext);
  async function handleRegister(loginObj: any) {
    // console.log('register->', loginObj);
    setModalVisible(true);
    const bodyData = {
      email: loginObj.email,
      password: loginObj.password,
      username: loginObj.userName,
      avatar: '',
      is_artist: false,
    };
    // console.log('bodyData->', bodyData);
    try {
      // 👇️ const data: CreateUserResponse
      // console.log('try->>', ApiServices.RegisterService);

      const response = await axios.post(ApiServices.RegisterService, bodyData);
      console.log(response);
      setModalVisible(false);
      ToastAndroid.showWithGravityAndOffset(
        'Account Successfully Registered',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      if (response.status === 200) {
        navigation.navigate('SignInScreen' as never);
      }
    } catch (e) {
      console.log(e);
      setModalVisible(false);
    }
  }
  const handlePress = (value: string) => {
    if (value) {
      setLoginObj(() => {
        return {...loginObj, userName: value, name: value};
      });

      console.log(loginObj);
      handleRegister(loginObj);

      // navigation.navigate('LoginGetPasswordScreen' as never)
    } else {
      alert('Please enter a valid name');
    }
  };
  const navigation = useNavigation();
  return (
    <>
      <BackGroundComponent>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View className="flex-1 w-full h-full justify-center items-center absolute z-10 bg-primary opacity-70"></View>
          <View className="flex-1 w-full h-full justify-center items-center absolute z-20">
            <ActivityIndicator size={'large'} className="self-center" />
          </View>
        </Modal>
        <CustomLoginHeaderComponent plaintext="Create Account" />
        <CustomLoginTextField
          plaintext="Whats Your Name?"
          infoText="this appears on your spotify profile"
          value={value}
          setActive={setActive}
          setValue={setValue}
          Icon={
            <Image
              resizeMode="contain"
              source={require('../../projectAssets/tick.png')}
              className=" h-5 w-4"
            />
          }
        />
        <View className=" border-t-grey border-t-[1px] mt-4 p-6 mx-5 ">
          <Text className="text-xs text-text text-start my-4 ">
            by clicking "create Account" you are agreeing to our terms and
            policies{' '}
          </Text>
          <Text className="text-xs text-green text-start my-4 ">
            Terms of use
          </Text>
          <Text className="text-xs text-text text-start my-4 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            ipsa voluptas ratione inventore obcaecati illo ut reiciendis,
            expedita vel minus! Quia qui amet, voluptatum officia dolore rerum
            dignissimos ut optio.
          </Text>
          <Text className="text-xs text-green text-start my-4 ">
            Privacy Policy
          </Text>
          <Text className="text-xs text-text text-start my-4 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            ipsa voluptas ratione inventore obcaecati illo ut reiciendis,
            expedita vel minus! Quia qui amet, voluptatum officia dolore rerum
            dignissimos ut optio.
          </Text>
        </View>
        <Pressable
          disabled={!active}
          onPress={() => handlePress(value)}
          className={`h-[42] w-auto px-5 absolute bottom-10 rounded-full justify-center items-center self-center mt-10 ${
            active ? 'bg-secondary' : 'bg-btnDeactivated'
          }`}>
          <Text className=" font-bold">create an account</Text>
        </Pressable>
      </BackGroundComponent>
    </>
  );
};

export default LoginGetUserNameScreen;
