import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

type Props = {
    image: string,
    name: string
}

const DrawerProfileItem = ({image, name}: Props) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate("ProfileScreen" as never)}}>
        <View className='flex-row p-4 border-b-[1px] border-btnDeactivated'>
        <Image
            source={image}
            className='h-12 w-12 rounded-full'
        />
        <View className='ml-4'>
            <Text className='text-text text-xl font-medium'>{name}</Text>
            <Text className='text-lightText' numberOfLines={1}>
            View Profile
            </Text>
        </View>
        </View>
    </TouchableOpacity>
    )
}

export default DrawerProfileItem