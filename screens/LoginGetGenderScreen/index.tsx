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

const LoginGetGenderScreen = (props: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const navigation = useNavigation();

  const handlePress = (value: string) => {
    if (value) {
      navigation.navigate('LoginGetPasswordScreen' as never);
      // console.log(loginObj);
    } else {
      alert('Please enter gender');
    }
  };
  return (
    <BackGroundComponent>
      <CustomLoginHeaderComponent plaintext="Create Account" />
      <CustomLoginTextField
        plaintext="Whats Your Gender?"
        infoText=""
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

export default LoginGetGenderScreen;
