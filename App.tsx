import {View} from 'react-native';

import React from 'react';

import {Provider} from 'react-redux';
import {store} from './Redux/store';
import Nav from './Navigator/NavigationContainer';

type Props = {};

const App = (props: Props) => {
  return (
    // <PlayListScreen />
    <Provider store={store}>
      <Nav />

      {/* <NavigationContainer>
        <TopStackNavigator />
      </NavigationContainer> */}
    </Provider>
    // <LibraryScreen />
    // <HomeScreen />
    // <SearchScreen />
    // <GenreSongVideoScreen/>
    //<LoginNavigator />
    // <MusicPlayerScreen />
    // <SignInScreen />
  );
};
export default App;
