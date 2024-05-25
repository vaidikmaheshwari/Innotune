import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface MusicPlayerStartState {
  isPlaying: boolean;
  musicPlayerLocation: number;
  isPaused: boolean;
  isShow: boolean;
  musicPlayerLink: string;
  duration: number;
  image: string;
  song_name: string;
  song_credits: string;
  video: string;
  id: number;
}

const initialState: MusicPlayerStartState = {
  musicPlayerLocation: 0,
  isPlaying: false,
  isPaused: true,
  isShow: false,
  musicPlayerLink: '',
  duration: 0,
  image: '',
  song_name: '',
  song_credits: '',
  video: '',
  id: 0,
};

const MusicPlayerSlice = createSlice({
  name: 'musicPlayerSlice',
  initialState,
  reducers: {
    setPauseEvent: state => {
      state.isPlaying = false;
      state.isPaused = true;
    },
    setPlayEvent: state => {
      state.isPlaying = true;
      state.isPaused = false;
    },
    setLocation: (state, action) => {
      state.musicPlayerLocation = action.payload;
    },
    setPause: state => {
      state.isPaused = true;
    },
    setPlay: state => {
      state.isPaused = false;
    },
    setIsShow: state => {
      state.isShow = true;
    },
    setLink: (state, action) => {
      state.musicPlayerLink = action.payload.link;
      state.duration = action.payload.duration;
      state.image = action.payload.image;
      state.song_name = action.payload.song_name;
      state.song_credits = action.payload.song_credits;
      state.video = action.payload.video;
      state.id = action.payload.id;
    },
  },
});

export const {
  setPauseEvent,
  setPlayEvent,
  setLocation,
  setPause,
  setPlay,
  setIsShow,
  setLink,
} = MusicPlayerSlice.actions;

export default MusicPlayerSlice.reducer;
