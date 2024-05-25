import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode,
  notTranslucent?: boolean,
};

const BackGroundComponent = ({children, notTranslucent}: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-primary min-h-full " >
      <StatusBar barStyle="light-content" backgroundColor={!notTranslucent ? "rgba(0, 0, 0 ,0.6)": "#1B1A1C"} translucent={!notTranslucent} />
      {children}
    </SafeAreaView>
  );  
};

export default BackGroundComponent;
