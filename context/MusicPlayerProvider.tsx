import React, {createContext, useEffect, useState} from 'react';
import {useAppSelector} from '../Redux/hooks';
type Props = {
  children: React.ReactNode;
};

export const MusicContext = createContext({
  currentPosition: 0,
  setCurrentPosition: null,
});

const MusicProvider = ({children}: Props) => {
  // const musicLink = useAppSelector(
  //   state => state.rootReducer.musicPlayer.musicPlayerLink,
  // );
  // useEffect(() => {
  //   setCurrentPosition(0);
  // }, [musicLink]);
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  return (
    <MusicContext.Provider value={{currentPosition, setCurrentPosition}}>
      {children}
    </MusicContext.Provider>
  );
};
export default MusicProvider;
