import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BackGroundComponent,
  CustomBottomDrawer,
  MusicLibraryHeader,
  MusicPlayerBottom,
} from '../../components';
import MusicLibraryComponent from '../../components/common/musicLibraryComponent';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {ApiServices} from '../../ApiServices';
import axios from 'axios';
import {useAppSelector} from '../../Redux/hooks';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {};
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const LibraryScreen = (props: Props) => {
  const navigation = useNavigation();
  const [userPlaylist, setUserPlaylist] = useState(null);
  console.log(
    'Vaidik->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    userPlaylist,
  );
  const [iconMode, setIconMode] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const User = useAppSelector(state => state.rootReducer.LoginReducer.User);

  useEffect(() => {
    FetchPlayList();
  }, []);
  const FetchPlayList = async () => {
    const config = {
      headers: {
        Authorization: `Token ${User?.token}`,
      },
    };
    try {
      console.log(ApiServices.FetchMyCreatedPlaylistService);
      const res = await axios.get(
        ApiServices.FetchMyCreatedPlaylistService + '?=&limit=20&offset=0',
        config,
      );
      if (res.status === 200) {
        console.log('Playlist fetched successfully');
        console.log('Hello g', res.data);
        setUserPlaylist(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    'bottom fire ho raha===========================================================',
  );
  return (
    <BackGroundComponent>
      <MusicLibraryHeader setActive={setActive} />
      <View className="flex-row justify-between mx-6 mt-10  ">
        <Text className="text-text text-sm font-medium ">Recents</Text>
        <Pressable
          className="pb-2 px-2 "
          onPress={() => setIconMode(!iconMode)}>
          {!iconMode ? (
            <Ionicons name="apps-outline" size={18} color="white" />
          ) : (
            <Ionicons name="list-outline" size={20} color="white" />
          )}
        </Pressable>
      </View>
      {iconMode ? (
        <FlatList
          ListFooterComponent={<View className=" h-1/5 w-full" />}
          className="mx-auto "
          key={'_'}
          keyExtractor={item => '_' + item.id}
          // ListFooterComponent={
          //   <>
          //     <View className="flex-row">
          //       <TouchableOpacity className="ml-1 justify-center h-40">
          //         <View className="  h-32  mb-10 w-32 pt-3 pr-2 ">
          //           <Image
          //             source={require('../../assets/dailyMix.jpeg')}
          //             className=" h-28 w-28 mb-1 rounded-md"
          //           />
          //           <View className="w-36 pl-1">
          //             <Text className="text-xs text-grey">Add Playlist</Text>
          //           </View>
          //         </View>
          //       </TouchableOpacity>
          //       <TouchableOpacity className="ml-1 justify-center h-40">
          //         <View className="  h-32  mb-10 w-32 pt-3 pr-2 ">
          //           <Image
          //             source={require('../../assets/dailyMix.jpeg')}
          //             className=" h-28 w-28 mb-1 rounded-full"
          //           />
          //           <View className="w-36 pl-1">
          //             <Text className="text-xs text-grey">Add Artist</Text>
          //           </View>
          //         </View>
          //       </TouchableOpacity>
          //     </View>
          //     <View className="h-20"></View>
          //   </>
          // }
          data={
            userPlaylist?.results
              ? userPlaylist?.results
              : ['', '', '', '', '', '', '', '']
          }
          numColumns={3}
          renderItem={item =>
            item === '' ? (
              <ShimmerPlaceholder className="h-40" />
            ) : (
              <TouchableOpacity
                className="self-center justify-center h-40"
                onPress={() =>
                  navigation.navigate('PlayListScreen' as never, {
                    id: item.item.id,
                    uri: item.item.playlist_picture,
                    name: item.item.playlist_name,
                  })
                }>
                <View className="h-32 mb-10 w-32 pt-3 pr-1 ">
                  <Image
                    source={
                      item.item.playlist_picture
                        ? {uri: item.item.playlist_picture}
                        : require('../../projectAssets/songPlaceholder.jpeg')
                    }
                    className=" h-28 w-28 mb-1 rounded-md"
                  />
                  <View className="w-36 pl-1">
                    <Text className="text-xs text-text">
                      {item.item.playlist_name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        />
      ) : (
        <>
          {console.log('Hello->', userPlaylist)}
          {userPlaylist ? (
            <FlatList
              key={'#'}
              keyExtractor={item => '#' + item.id}
              data={userPlaylist?.results}
              ListFooterComponent={
                <>
                  <MusicLibraryComponent titleText="Add Playlist" />
                  <MusicLibraryComponent titleText="Add Artist" isArtist />
                  <View className="h-32" />
                </>
              }
              renderItem={({item}) => (
                <>
                  {console.log(item)}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PlayListScreen' as never, {
                        id: item.id,
                        uri: item.playlist_picture,
                        name: item.playlist_name,
                        fetchPlaylists: FetchPlayList,
                      })
                    }>
                    <MusicLibraryComponent
                      uri={item.playlist_picture}
                      titleText={item.playlist_name}
                      // infoText={item.item.description}
                    />
                  </TouchableOpacity>
                </>
              )}
            />
          ) : (
            <>
              {console.log('Shimmer CAlledd ====>>>>')}
              <FlatList
                data={['', '', '', '', '', '', '', '', '']}
                renderItem={({item}) => (
                  <View className="flex-row items-center ml-6">
                    <ShimmerPlaceholder
                      className="h-16 w-16 mt-4 rounded-md"
                      shimmerColors={['#282828', '#383838', '#282828']}
                    />
                    <ShimmerPlaceholder
                      className="ml-6 rounded-md"
                      shimmerColors={['#282828', '#383838', '#282828']}
                    />
                  </View>
                )}
              />
            </>
          )}
        </>
      )}
      {/* <MusicPlayerBottom setModalVisible={setModalVisible} /> */}
      {active ? <CustomBottomDrawer setActive={setActive} /> : null}
    </BackGroundComponent>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({});
