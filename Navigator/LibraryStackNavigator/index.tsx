import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  
  LibraryScreen,
  PlayListScreen,
  ProfileScreen,
  UserPlaylistsScreen,
} from '../../screens';

const Stack = createNativeStackNavigator();

export default function LibraryStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserPlaylists" component={UserPlaylistsScreen} />
      <Stack.Screen name="PlayListScreen" component={PlayListScreen} />
    </Stack.Navigator>
  );
}
