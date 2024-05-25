import {createSlice} from '@reduxjs/toolkit';
import {Song} from '../../types';
interface startState {
  songsList: Song[];
  currIndex: number;
  totalIndex: number;
  playlistId: number;
}

const initialState: startState = {
  songsList: [],
  currIndex: 0,
  totalIndex: 0,
  playlistId: 0,
};

const musicPlayerQueueSlice = createSlice({
  name: 'musicPlayerQueue',
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlistId = action.payload.id;
      state.songsList = action.payload.items;
      state.totalIndex = state.songsList.length;
      state.currIndex = 0;
    },
    goTonextSong: state => {
      if (state.currIndex < state.totalIndex) state.currIndex++;
    },
    prevSong: state => {
      if (state.currIndex >= 1) {
        state.currIndex--;
      }
    },
  },
});

export const {goTonextSong, prevSong, setPlaylist} =
  musicPlayerQueueSlice.actions;

export default musicPlayerQueueSlice.reducer;
