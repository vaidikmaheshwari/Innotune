import {View, Text, Pressable, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
  CustomLoginTextField,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {LoginContext} from '../../context/LoginProvider';

type Props = {};

const LoginGetPasswordScreen = (props: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const {loginObj, setLoginObj} = useContext(LoginContext);
  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  const handlePress = (value: string) => {
    // console.log(validateEmail(value));

    if (validatePassword(value)) {
      setLoginObj(() => {
        return {...loginObj, password: value};
      });

      console.log(loginObj);
      navigation.navigate('LoginGetUserNameScreen' as never);
    } else {
      alert('Please enter a valid password');
    }
  };
  const navigation = useNavigation();
  return (
    <BackGroundComponent>
      <CustomLoginHeaderComponent plaintext="Create Account" />
      <CustomLoginTextField
        plaintext="Create Password"
        infoText="password must be at least 8 characters"
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

export default LoginGetPasswordScreen;
