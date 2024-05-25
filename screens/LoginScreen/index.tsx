import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  BackGroundComponent,
  CustomLargeButtonComponent,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
type Props = {};

const LoginScreen = (props: Props) => {
  const navigation = useNavigation();
  return (
    <BackGroundComponent>
      <ImageBackground
        className=" h-[76%] w-full blur-md"
        source={require('../../projectAssets/spotifybackground.png')}></ImageBackground>

      <View className="h-full w-full absolute bg-primary opacity-70"></View>
      <View className="absolute self-center mt-[65%]">
        <Image
          className=" self-center h-15 w-15 relative"
          source={require('../../projectAssets/Logo.png')}
        />
        <Text className="w-full h-30 text-secondary text-3xl font-bold text-center mt-4 text-[28px] ">
          Millions Of Songs {'\n'} Free On Spotify.
        </Text>
        <View className="h-7" />
        <CustomLargeButtonComponent
          onPress={() => navigation.navigate('LoginGetEmailScreen' as never)}
          plaintext="Signup For Free"
          green
        />
        <CustomLargeButtonComponent
          plaintext="Continue with Google"
          green={false}
          Icon={
            <Image
              resizeMode="contain"
              className="content-center h-4 w-4"
              source={require('../../projectAssets/Component 37.png')}
            />
          }
        />
        <CustomLargeButtonComponent
          plaintext="Continue with Apple"
          green={false}
          Icon={
            <Image
              resizeMode="contain"
              className="content-center h-4 w-4"
              source={require('../../projectAssets/Apple.png')}
            />
          }
        />
        <CustomLargeButtonComponent
          plaintext="Continue with Facebook"
          green={false}
          Icon={
            <Image
              resizeMode="contain"
              className="content-center h-4 w-4"
              source={require('../../projectAssets/facebook.png')}
            />
          }
        />
        <Pressable onPress={() => navigation.navigate('SignInScreen' as never)}>
          <Text className=" text-base font-black text-text self-center mt-3 ">
            Log In
          </Text>
        </Pressable>
      </View>
    </BackGroundComponent>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
