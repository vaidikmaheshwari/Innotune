import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import HomeHeaderBtn from '../HomeHeaderBtn';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {useAppSelector} from '../../../Redux/hooks';

type Props = {};

const HomeHeader = (props: Props) => {
  const navigation = useNavigation()
  const [btn1pressed, setBtn1pressed] = useState<boolean>(true);
  const [btn2pressed, setBtn2pressed] = useState<boolean>(false);
  const [btn3pressed, setBtn3pressed] = useState<boolean>(false);
  function btn1Handler() {
    setBtn1pressed(true);
    setBtn2pressed(false);
    setBtn3pressed(false);
  }
  function btn2Handler() {
    setBtn1pressed(false);
    setBtn2pressed(true);
    setBtn3pressed(false);
  }
  function btn3Handler() {
    setBtn1pressed(false);
    setBtn2pressed(false);
    setBtn3pressed(true);
  }
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  return (
    <>
      <View className="h-12 mt-12 ">
        <View className="flex-row p-[4%] gap-2">
          {/* profile button */}
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <View>
              <Image
                source={{uri: user?.user_info?.avatar}}
                className="h-8 w-8 rounded-full"
              />
            </View>
          </Pressable>
          <View className="flex-row   h-10 p-[1]  gap-2">
            <HomeHeaderBtn
              btnTxt="All"
              isActive={btn1pressed}
              btnHandler={btn1Handler}
            />
            <HomeHeaderBtn
              btnTxt="Music"
              isActive={btn2pressed}
              btnHandler={btn2Handler}
            />
            <HomeHeaderBtn
              btnTxt="Podcast"
              isActive={btn3pressed}
              btnHandler={btn3Handler}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeHeader;
