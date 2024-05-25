import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BackGroundComponent,
  CustomLargeButtonComponent,
} from '../../components';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {getLogin} from '../../Redux/slices/LoginSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
type Props = {};

const SignInScreen = (props: Props) => {
  const dispatch = useAppDispatch();
  const [passText, setPassText] = useState<boolean>(true);
  const [emailText, setEmailText] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [passView, setPassView] = useState<boolean>(false);

  const loading = useAppSelector(
    state => state.rootReducer.LoginReducer.isLoading,
  );
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let validateEmail = (plate: string) => {
    console.log(emailRegex.test(plate));

    return emailRegex.test(plate);
  };
  let validatePlate = (plate: string) => {
    const passwordRegex = new RegExp(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    );
    console.log(passwordRegex.test(plate));

    return passwordRegex.test(plate);
  };
  const navigation = useNavigation();
  return (
    <BackGroundComponent>
      <Image
        className="absolute h-[500] w-full"
        source={require('../../projectAssets/spotifybackground.png')}
      />
      <View className="h-full w-full absolute bg-primary opacity-70"></View>
      <TouchableOpacity
        className=" top-14 left-3"
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-35}
        behavior="position"
        className="absolute self-center mt-[65%] flex-1">
        <View>
          <Image
            className=" self-center h-15 w-15 relative"
            source={require('../../projectAssets/Logo.png')}
          />

          <Text className="w-full h-30 text-secondary text-3xl font-bold text-center mt-4 text-[28px] ">
            Millions Of Songs {'\n'} Free On Innotune.
          </Text>
          <View className="h-7" />

          <View className=" self-center flex-row justify-between h-12 bg-secondary w-[350] font-semibold rounded-lg px-4 items-center mt-4">
            {emailText ? null : (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="green"
                className="mr-2"
              />
            )}
            <TextInput
              value={email}
              className="w-[90%] font-semibold ml-1"
              placeholder="Email"
              onChangeText={text => {
                setEmail(text);
                validateEmail(text);
                if (validateEmail(text)) {
                  setEmailText(false);
                } else if (validateEmail(text) === false) {
                  setEmailText(true);
                }
              }}
            />
          </View>
          {emailText ? (
            <Text className=" text-xs font-medium text-accent text-start ml-1">
              enter a valid email address
            </Text>
          ) : null}

          <View className=" self-center flex-row justify-between h-12 bg-secondary w-[350] font-semibold rounded-lg px-4 items-center mt-4">
            {passText ? null : (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color="green"
                className="mr-2"
              />
            )}
            <TextInput
              className="w-[85%] font-semibold ml-1"
              secureTextEntry={!passView}
              placeholder="password"
              value={pass}
              onChangeText={text => {
                setPass(text);
                validatePlate(text);
                if (validatePlate(text)) {
                  setPassText(false);
                } else if (validatePlate(text) === false) {
                  setPassText(true);
                }
              }}
            />
            <Pressable onPress={() => setPassView(!passView)}>
              <Ionicons
                name={!passView ? 'eye-off' : 'eye'}
                size={24}
                color="grey"
              />
            </Pressable>
          </View>
          {passText ? (
            <Text className=" text-xs font-medium text-accent text-start ml-1">
              password must be atleast 8 charecters long
            </Text>
          ) : null}

          <View className="w-[300] mt-8 self-center">
            <CustomLargeButtonComponent
              onPress={() => dispatch(getLogin({email: email, password: pass}))}
              plaintext="Login In Your Account"
              Icon={
                loading ? <ActivityIndicator size={32} color={'white'} /> : null
              }
              green
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </BackGroundComponent>
  );
};

export default SignInScreen;
