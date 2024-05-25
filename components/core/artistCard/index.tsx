import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {artistDetails} from '../../../utils/dataObjects';
import {useNavigation} from '@react-navigation/native';
type Props = {};

const ArtistCard = (props: Props) => {
  const navigation = useNavigation();
  const [isFollower, setIsFollower] = useState<Boolean>(false);
  return (
    <View className="h-[350] w-[90%] rounded-2xl  bg-darkgrey  mx-auto mb-10 mt-[-150]">
      {/* photo and one line text */}
      <View>
        <TouchableOpacity>
          <Image
            source={require('../../../projectAssets/song2Poster.jpeg')}
            className="w-[100%] h-[85%]  rounded-t-2xl"
          />
          <Text className="text-text font-bold absolute mt-4 ml-4 text-lg">
            About the Artist
          </Text>
        </TouchableOpacity>
      </View>
      {/* text , button  */}
      <View className="w-[90%] mx-auto flex-col mt-[-70] ">
        <View className="flex-row justify-between items-center">
          {/* name, monthly listeners, follow */}
          <TouchableOpacity>
            <View>
              <Text className="text-text font-extrabold text-xl">
                Arjun Kanungo
              </Text>
              <Text className="text-lightText">4.5 monthly listeners</Text>
            </View>
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              className=" border-[1px] border-grey rounded-3xl px-3 py-1"
              onPress={() => setIsFollower(!isFollower)}>
              <Text className="text-text font-extrabold text-md text-center">
                {isFollower ? 'Follow' : 'Following'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ArtistDetail' as never)}>
          <View className="mt-2  ">
            {artistDetails.length > 130 ? (
              <Text className="text-lightgrey">{`${artistDetails.slice(
                0,
                130,
              )}...see more`}</Text>
            ) : (
              <Text>{`${artistDetails}...see more`}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArtistCard;
