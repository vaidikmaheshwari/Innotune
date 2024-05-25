import {View, Text, Touchable, TouchableOpacity, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useRef} from 'react';
import TabNavigator from '../TabNavigator';
import {useNavigation} from '@react-navigation/native';
import {DrawerItem, DrawerProfileItem} from '../../components';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {userLogoutRequested} from '../../Redux/slices/LoginSlice';

const Drawer = createDrawerNavigator();

type Props = {};

const ProfileDrawerNavigator = (props: Props) => {
  const navigation = useNavigation();
  const user = useAppSelector(state => state.rootReducer.LoginReducer.User);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(userLogoutRequested({userToken: user?.token}));
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: '#282828', width: '86%'},
        drawerType: 'slide',
      }}
      drawerContent={() => (
        <View className="mt-12">
          <DrawerProfileItem
            image={{
              uri: user?.user_info?.avatar ? user?.user_info?.avatar : null,
            }}
            name={user?.user_info?.username ? user.user_info.username : ''}
          />
          <DrawerItem text="What's new" icon="flash-outline" />
          <DrawerItem text="Listening history" icon="timer-outline" />
          <DrawerItem text="Logout" icon="exit-outline" onPressEvent={logout} />
        </View>
      )}>
      <Drawer.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
      />
      {/* <Drawer.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={({ navigation }) => ({ 
            
          })}
        /> */}
    </Drawer.Navigator>
  );
};

export default ProfileDrawerNavigator;
