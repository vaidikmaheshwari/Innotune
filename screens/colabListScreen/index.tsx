import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BackGroundComponent, CustomLoginHeaderComponent } from '../../components'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import axios from 'axios'

import { Ionicons } from '@expo/vector-icons';
import { ApiServices } from '../../ApiServices'
import { useRoute } from '@react-navigation/native'
import SearchResultListItem from '../../components/core/searchResultListItemComponent'
import { setIsShow, setLink, setPlayEvent } from '../../Redux/slices/MusicPlayerSlice'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
type Props = {}
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ColabListScreen = () => {
    const route = useRoute();
    // console.log("Hello->",route.params);
    const songId= route.params.songId;
    const dispatch = useAppDispatch();
    const user = useAppSelector(state=>state.rootReducer.LoginReducer.User);
    const [responseData,setResponseData]= useState();
    const handleGetAllColabSong=async()=>{
        const config = {
            headers: {
              Authorization: `Token ${user?.token}`,
            },
          };
          
          
          try {
            // console.log('Hello!');
            // console.log(`${ApiServices.GetColabListService}${songId}`);
            const response = await axios.get(
                `${ApiServices.GetColabListService}${songId}`,
              config,
            );
            console.log(response.data.results);
            
            setResponseData(response.data.results);
            
          } catch (e) {
            console.log(e);
          }
    }
    useEffect(()=>{
        handleGetAllColabSong();
    },[]);
  return (
    <BackGroundComponent notTranslucent>
         <CustomLoginHeaderComponent plaintext="Colab list" />
         {
            
            <FlatList
           data={responseData ? responseData : [' ', ' ', ' ', ' ']} 
           ItemSeparatorComponent={()=><View className='mb-2'></View>}
           renderItem={({item})=>
           <>
           {item == ' '? (<View className="flex-row items-center mx-2 w-full">
            <ShimmerPlaceholder
              className="h-12 w-12 rounded-md"
              shimmerColors={['#282828', '#383838', '#282828']}
            />
            <ShimmerPlaceholder
              className="mx-3 rounded-lg"
              shimmerColors={['#282828', '#383838', '#282828']}
            />
          </View>):(<SearchResultListItem
           itemName={item.colab_name}
           itemPicture={item.colab_picture}
           itemArtist={item.song_name}
           itemType="song"
           itemSong={item.audio}
           duration={item.audio_duration}
           itemVideo={item.video}
           itemIcon="musical-notes-outline"
           itemId={item.id}
           itemAlbum={item.song_name}
           
           onPressEvent={() => {
             dispatch(
               setLink({
                 link: item.audio,
                 song_credits: item.credits,
                 song_name: item.song_name,
                 duration: item.audio_duration,
                 image: item.song_picture,
                 video: item.video,
                 id: item.id,
               }),
             );
             dispatch(setPlayEvent());
             dispatch(setIsShow());
             
           }}
           
          />)}
           
           </>
           
           }
         />}
         
         
    </BackGroundComponent>
  )
}

export default ColabListScreen

