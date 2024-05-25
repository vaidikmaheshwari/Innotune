import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useEffect} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, View} from 'react-native';
import SearchStackNavigator from '../SearchStackNavigator';
import HomeStackNavigatior from '../HomeStackNavigator';
import LibraryStackNavigator from '../LibraryStackNavigator';

const Tab = createBottomTabNavigator();
import MusicProvider, {MusicContext} from '../../context/MusicPlayerProvider';
import {useAppSelector} from '../../Redux/hooks';
import {MusicPlayerBottom} from '../../components';
import MusicPlayerScreen from '../../screens/MusicPlayerScreen';
import {Audio} from 'expo-av';

function TabNavigator() {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const isPlaying = useAppSelector(
    state => state.rootReducer.musicPlayer.isPlaying,
  );
  const isPaused = useAppSelector(
    state => state.rootReducer.musicPlayer.isPaused,
  );
  const songsList = useAppSelector(
    state => state.rootReducer.MusicPlayerQueueReducer.songsList,
  );
  const current = useAppSelector(
    state => state.rootReducer.MusicPlayerQueueReducer.currIndex,
  );



  const isShow = useAppSelector(state => state.rootReducer.musicPlayer.isShow);
  const musicInfo = useAppSelector(state => state.rootReducer.musicPlayer);
  const song = {uri: musicInfo.musicPlayerLink};
  const [soundDuration, setSoundDuration] = useState(0);
  const [position, setPosition] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [sound, setSound] = useState();
  React.useEffect(() => {
    if (isPlaying) {
      (async () => {
        console.log('Loading Sound');
        const {sound} = await Audio.Sound.createAsync(song);

        setSound(sound);
        console.log('Playing Sound');

        await sound.playAsync();

        const soundInfo = await sound.getStatusAsync();
        setSoundDuration(soundInfo.durationMillis);
      })();
    }
  }, [isPlaying, musicInfo.musicPlayerLink]);
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const toggleMute = async () => {
    if (sound !== null) {
      await sound.setVolumeAsync(!isMuted ? 0 : 1);
    }
    setIsMuted(() => !isMuted);
  };
  const playFunction = async () => {
    sound ? await sound.playAsync() : null;
    console.log('playing sound');
  };
  const pauseFunction = async () => {
    const soundInfo = await sound.getStatusAsync();
    sound ? await sound.pauseAsync() : null;
    setPosition(soundInfo.positionMillis);
    console.log(soundInfo);
  };
  if (isPaused === false) {
    playFunction();
  } else if (isPaused === true) {
    pauseFunction();
  }

  return (
    <MusicProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            opacity: 0.8,
            backgroundColor: '#1B1A1C',
            borderWidth: 0,
            shadowOpacity: 0,
            borderColor: 'none',
            shadowColor: 'none',
            borderTopWidth: 0,
            height: 60,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigatior}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.container}>
                <Ionicons
                  name="home"
                  size={25}
                  color={focused ? 'white' : 'grey'}
                />
                <Text
                  style={[styles.text, {color: focused ? 'white' : 'grey'}]}>
                  Home
                </Text>
              </View>
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.container}>
                <Ionicons
                  name="search"
                  size={24}
                  color={focused ? 'white' : 'grey'}
                />
                <Text
                  style={[styles.text, {color: focused ? 'white' : 'grey'}]}>
                  search
                </Text>
              </View>
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryStackNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.container}>
                <Ionicons
                  name="library-outline"
                  size={24}
                  color={focused ? 'white' : 'grey'}
                />
                <Text
                  style={[styles.text, {color: focused ? 'white' : 'grey'}]}>
                  library
                </Text>
              </View>
            ),
            unmountOnBlur: true,
          }}
        />
        {/* <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
           tabBarItemStyle: {display: 'none'}
        }} 
      /> */}
      </Tab.Navigator>
      {isShow && soundDuration ? (
        <MusicPlayerBottom
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          duration={soundDuration}
          image={musicInfo.image}
          songName={musicInfo.song_name}
          Credits={musicInfo.song_credits}
        />
      ) : null}
    </MusicProvider>
  );
}
export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    marginTop: 3,
    textAlign: 'center',
  },
});
