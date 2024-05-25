import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
  CustomRoundedOutlineButton,
  SearchResultListItemComponent,
} from '../../../components';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {userPlaylist} from '../../../utils/dataObjects';
import {useAppSelector} from '../../../Redux/hooks';
import axios from 'axios';
import {ApiServices} from '../../../ApiServices';
import {PlaylistResponse} from '../../../types';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {};
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProfileScreen = (props: Props) => {
  const navigation = useNavigation();
  const [hidden, setHidden] = useState(true);
  const [responseData, setResponseData] = useState<PlaylistResponse>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('screen').height;
  console.log('Screen Height: ', screenHeight);
  // const translate = scrollY.interpolate({
  //   inputRange: [0, 45],
  //   outputRange: [0, 11],
  // });
  const opacity = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [0, 1],
  });
  console.log('Opacity ', opacity);
  // console.log('Translate ', translate);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Token ${User?.token}`,
      },
    };

    const FetchPlayList = async () => {
      try {
        console.log(ApiServices.FetchMyCreatedPlaylistService);
        const res = await axios.get(
          ApiServices.FetchMyCreatedPlaylistService + '?=&limit=3&offset=0',
          config,
        );
        if (res.status === 200) {
          console.log('Playlist fetched successfully');

          setResponseData(res.data);
          console.log('Response Data ', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    FetchPlayList();
  }, []);

  const User = useAppSelector(state => state.rootReducer.LoginReducer.User);
  return (
    <BackGroundComponent>
      <Animated.View
        style={{
          top: 0,
          position: 'absolute',
          width: '100%',
          zIndex: 10,
          opacity: opacity,
          // transformOrigin: `0 ${translate}`,
          // transform: [{translateY: translate}],
        }}>
        <View className="flex-row items-center pt-14 pb-4 bg-darkaccent">
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="white" />
          </TouchableOpacity> */}
          <Text className="text-[16px] font-bold text-text text-center mx-14 mt-1">
            {User?.user_info?.username}
          </Text>
        </View>
      </Animated.View>
      <TouchableOpacity
        className="mx-3 mt-14 absolute z-20"
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>

      {responseData ? (
        <FlatList
          ListHeaderComponent={
            <>
              <LinearGradient
                colors={['rgba(231, 76, 60 ,0.8)', 'transparent']}
                end={{x: 0.5, y: 1}}
                className="flex-1 bg-primary ">
                <View className="h-12">
                  {/* <CustomLoginHeaderComponent /> */}
                </View>
                <View className="flex-row mt-10 p-4 items-center">
                  <Image
                    source={{uri: User?.user_info?.avatar}}
                    className="h-32 w-32 rounded-full"
                  />
                  <View className="ml-5">
                    <Text className="text-text text-3xl font-medium mb-2">
                      {User?.user_info?.username}
                    </Text>
                    <Text className="text-lightText gap-1" numberOfLines={1}>
                      <Text className="text-text text-lg font-medium mr-1">
                        {User?.user_info?.followers.length?.toString()}
                      </Text>{' '}
                      followers{'   '}
                      <Text className="text-text text-lg font-medium">
                        {User?.user_info?.following.length?.toString()}
                      </Text>{' '}
                      following
                    </Text>
                  </View>
                </View>
                <View className="flex-row mx-5 my-3 items-center">
                  <CustomRoundedOutlineButton
                    text="Edit"
                    onPressEvent={() =>
                      navigation.navigate('EditProfile' as never)
                    }
                  />
                  <TouchableOpacity className="ml-3">
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <Text className="text-text text-xl font-medium m-5">
                Playlists
              </Text>
            </>
          }
          data={responseData.results}
          renderItem={({item}) => (
            <View className="mx-5">
              <SearchResultListItemComponent
                itemName={item.playlist_name}
                itemType="playlist"
                itemPicture={item.playlist_picture}
                onPressEvent={() =>
                  navigation.navigate('PlayListScreen' as never, {
                    id: item.id,
                    uri: item.playlist_picture,
                    name: item.playlist_name,
                  })
                }
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View className="my-2" />}
          ListFooterComponent={
            <>
              <View className="mt-4 w-[40%] self-center">
                <CustomRoundedOutlineButton
                  text="See all playlists"
                  onPressEvent={() =>
                    navigation.navigate('UserPlaylists' as never)
                  }
                />
              </View>
              <View className="h-[560px]" />
            </>
          }
          onScroll={e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
        />
      ) : (
        <ActivityIndicator size="medium" color="#1ED760" className="mt-[90%]" />
      )}
    </BackGroundComponent>
  );
};

export default ProfileScreen;
