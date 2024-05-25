import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PlayListScreen,
  ProfileScreen,
  SearchResultScreen,
  SearchScreen,
  UserPlaylistsScreen,
} from '../../screens';

const Stack = createNativeStackNavigator();

export default function SearchStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserPlaylists" component={UserPlaylistsScreen} />
      <Stack.Screen name="PlayListScreen" component={PlayListScreen} />
    </Stack.Navigator>
  );
}
