import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EditProfileScreen, GenreSongVideoScreen} from '../../screens';
import ProfileDrawerNavigator from '../ProfileDrawerNavigator';
import PlayListScreen from '../../screens/playListScreen';
import ArtistDetailScreen from '../../screens/artistDetailsScreen';
import ColabListScreen from '../../screens/colabListScreen';


const Stack = createNativeStackNavigator();

export default function TopStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Drawer" component={ProfileDrawerNavigator} />
      <Stack.Screen name="GenreSong" component={GenreSongVideoScreen}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen}/>
      <Stack.Screen name="ColabList" component={ColabListScreen}/>
    </Stack.Navigator>
  );
}
