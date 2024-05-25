import {View, Text, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
  CustomLoginTextField,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {LoginContext} from '../../context/LoginProvider';

type Props = {};

const LoginGetEmailScreen = (props: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const {loginObj, setLoginObj} = useContext(LoginContext);
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handlePress = (value: string) => {
    // console.log(validateEmail(value));

    if (validateEmail(value)) {
      setLoginObj(() => {
        return {...loginObj, email: value};
      });

      console.log(loginObj);
      navigation.navigate('LoginGetGenderScreen' as never);
    } else {
      alert('Please enter a valid email');
    }
  };
  const navigation = useNavigation();
  return (
    <BackGroundComponent notTranslucent>
      <CustomLoginHeaderComponent plaintext="Create Account" />
      <CustomLoginTextField
        plaintext="Whats Your Email?"
        infoText="u will have to verify your email"
        value={value}
        setActive={setActive}
        setValue={setValue}
      />
      <Pressable
        disabled={!active}
        onPress={() => handlePress(value)}
        className={`h-[42] w-[82] rounded-full justify-center items-center self-center mt-10 ${
          active ? 'bg-secondary' : 'bg-btnDeactivated'
        }`}>
        <Text className=" font-bold">Next</Text>
      </Pressable>
    </BackGroundComponent>
  );
};

export default LoginGetEmailScreen;
