import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginGetEmailScreen,
  LoginGetGenderScreen,
  LoginGetPasswordScreen,
  LoginGetUserNameScreen,
  LoginScreen,
  SignInScreen,
} from '../../screens';
import LoginProvider from '../../context/LoginProvider';

const Stack = createNativeStackNavigator();
function LoginNavigator() {
  return (
    <NavigationContainer>
      <LoginProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="LoginGetEmailScreen"
            component={LoginGetEmailScreen}
          />
          <Stack.Screen
            name="LoginGetGenderScreen"
            component={LoginGetGenderScreen}
          />
          <Stack.Screen
            name="LoginGetPasswordScreen"
            component={LoginGetPasswordScreen}
          />
          <Stack.Screen
            name="LoginGetUserNameScreen"
            component={LoginGetUserNameScreen}
          />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
        </Stack.Navigator>
      </LoginProvider>
    </NavigationContainer>
  );
}

export default LoginNavigator;
