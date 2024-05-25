import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  PlayListScreen,
  ProfileScreen,
  UserPlaylistsScreen,
} from '../../screens';
import ListSongsScreen from '../../screens/listSongsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigatior() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserPlaylists" component={UserPlaylistsScreen} />
      <Stack.Screen name="PlayListScreen" component={PlayListScreen} />
      <Stack.Screen name="ListSongScreen" component={ListSongsScreen} />
    </Stack.Navigator>
  );
}
