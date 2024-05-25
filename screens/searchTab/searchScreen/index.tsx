import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import SearchComponent from '../../../components/core/searchComponent';
import ExploreGenreComponent from '../../../components/core/exploreGenreComponent';
import SearchGenreComponent from '../../../components/core/searchGenreComponent';
import {useState} from 'react';
import {BackGroundComponent} from '../../../components';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {ApiServices} from '../../../ApiServices';
import {useAppDispatch, useAppSelector} from '../../../Redux/hooks';
import {genreFetchRequested} from '../../../Redux/slices/GenreSlice';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {};

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const SearchScreen = (props: Props) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [exploreGenreList, setExploreGenreList] = useState(null);
  const navigation = useNavigation();
  const User = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const genreList = useAppSelector(
    state => state.rootReducer.GenreReducer.genreList,
  );
  const dispatch = useAppDispatch();

  const goToSearchResult = () => {
    navigation.navigate('SearchResult' as never);
  };
  useEffect(() => {
    if (!genreList) dispatch(genreFetchRequested(User?.token));
    (async () => {
      try {
        let headersList = {
          Authorization: 'Token ' + User?.token,
        };
        console.log('Explore Genre: header ', headersList);
        console.log(ApiServices.ExploreGenreService);
        const response = await axios.request({
          url: ApiServices.ExploreGenreService,
          method: 'GET',
          headers: headersList,
        });
        console.log('Explore Genre: ', response.data);

        setExploreGenreList(response.data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);
  return (
    <BackGroundComponent>
      <View className="flex-1 w-[94%] mx-auto py-2 mt-12">
        {hidden ? (
          <View className="flex-row items-center">
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <View>
                <Image
                  source={{uri: User?.user_info?.avatar}}
                  className="h-8 w-8 rounded-full"
                />
              </View>
            </Pressable>
            <Text className="flex-1 mx-4 text-2xl font-medium text-text">
              Search
            </Text>
            <Ionicons name="camera-outline" size={32} color="white" />
          </View>
        ) : null}
        <SearchComponent onPressEvent={goToSearchResult} />

        <FlatList
          onStartReachedThreshold={0.1}
          onStartReached={() => {
            setHidden(true);
          }}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            setHidden(false);
          }}
          bounces={false}
          ListHeaderComponent={
            <>
              <Text className="text-text text-lg font-medium my-2">
                Explore your genres
              </Text>
              <View className="flex-row justify-evenly">
                {exploreGenreList ? (
                  <>
                    <ExploreGenreComponent
                      genre={{
                        name: exploreGenreList[0].genre.genre,
                        videoUrl: exploreGenreList[0].songs[0].video,
                        songPoster: exploreGenreList[0].songs[0].song_picture,
                      }}
                      onPress={() =>
                        navigation.navigate(
                          'GenreSong' as never,
                          exploreGenreList[0],
                        )
                      }
                    />
                    <ExploreGenreComponent
                      genre={{
                        name: exploreGenreList[1].genre.genre,
                        videoUrl: exploreGenreList[1].songs[0].video,
                        songPoster: exploreGenreList[1].songs[0].song_picture,
                      }}
                      onPress={() =>
                        navigation.navigate(
                          'GenreSong' as never,
                          exploreGenreList[1],
                        )
                      }
                    />
                    <ExploreGenreComponent
                      genre={{
                        name: exploreGenreList[2].genre.genre,
                        videoUrl: exploreGenreList[2].songs[0].video,
                        songPoster: exploreGenreList[2].songs[0].song_picture,
                      }}
                      onPress={() =>
                        navigation.navigate(
                          'GenreSong' as never,
                          exploreGenreList[2],
                        )
                      }
                    />
                  </>
                ) : (
                  <>
                    <ShimmerPlaceholder
                      className="rounded-xl w-[30%] h-56"
                      shimmerColors={['#282828', '#383838', '#282828']}
                    />
                    <ShimmerPlaceholder
                      className="rounded-xl w-[30%] h-56"
                      shimmerColors={['#282828', '#383838', '#282828']}
                    />
                    <ShimmerPlaceholder
                      className="rounded-xl w-[30%] h-56"
                      shimmerColors={['#282828', '#383838', '#282828']}
                    />
                  </>
                )}
              </View>
              <Text className="text-text text-lg font-medium my-2">
                Browse all
              </Text>
            </>
          }
          showsVerticalScrollIndicator={false}
          className="flex-1"
          numColumns={2}
          data={genreList ? genreList : ['', '', '', '', '', '', '', '']}
          renderItem={({item}) =>
            item === '' ? (
              <ShimmerPlaceholder
                className="h-28 w-[48%] rounded-lg mr-3"
                shimmerColors={['#282828', '#383838', '#282828']}
              />
            ) : (
              <SearchGenreComponent item={item} />
            )
          }
          ItemSeparatorComponent={() => <View className="my-1"></View>}
          ListFooterComponent={<View className="mb-14" />}
        />
      </View>
    </BackGroundComponent>
  );
};

export default SearchScreen;
