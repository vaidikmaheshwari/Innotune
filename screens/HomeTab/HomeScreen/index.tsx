import {View, Text, LogBox, Image, ImageBackground} from 'react-native';
import React, { useEffect } from 'react';
import {
  BackGroundComponent,
  HomeComponent,
  HomeHeader,
} from '../../../components';

type Props = {};

const HomeScreen = (props: Props) => {
  useEffect(() => {  
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  },[]);
  return (
    <BackGroundComponent>
      {/* Header component */}
      <HomeHeader />  
      <View className="mb-20">
        <HomeComponent />
      </View>
      
    </BackGroundComponent>
  );
};

export default HomeScreen;
