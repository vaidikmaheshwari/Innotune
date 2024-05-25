import {View, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../Redux/hooks';
import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from '../LoginNavigator';
import TopStackNavigator from '../TopStackNavigator';

type Props = {};

const Nav = (props: Props) => {
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  return user !== null ? (
    <NavigationContainer>
      <TopStackNavigator />
    </NavigationContainer>
  ) : (
    <LoginNavigator />
  );
};

export default Nav;
