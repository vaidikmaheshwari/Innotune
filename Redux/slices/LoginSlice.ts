import {createSlice} from '@reduxjs/toolkit';
interface UserInfo {
  id: number;
  email: string;
  username: string;
  avatar: string;
  is_artist: boolean;
  is_deleted: boolean;
  total_followers: number;
  total_following: number;
  followers: any[]; // Assuming followers are objects with varying structure
  following: any[]; // Assuming following are objects with varying structure
  status: string;
}

interface LikedSongs {
  id:string[]; // Assuming liked songs can have various structures
}

interface LikedAlbums {
  [albumId: string]: any; // Assuming liked albums can have various structures
}

interface LikedPlaylists {
  [playlistId: string]: any; // Assuming liked playlists can have various structures
}

interface ResponseObject {
  token: string;
  user_info: UserInfo | null;
  liked_songs: LikedSongs;
  liked_album: LikedAlbums;
  liked_playlist: LikedPlaylists;
}

interface startState {
  User: ResponseObject | null;
  isLoading: boolean;
}

const initialState: startState = {
  User: null,
  isLoading: false,
};

const LoginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    getLogin: (state, action) => {
      console.log(action.payload);
      state.isLoading = true;
    },
    getLoginSuccess: (state, action) => {
      state.User = action.payload;
      state.isLoading = false;
    },
    getLoginFailed: state => {
      state.isLoading = false;
    },
    updateUserRequest: (state, action)=>{
      state.isLoading = true;
    },
    updateUserSucess: (state, action)=>{
      state.User.user_info.avatar = action.payload.avatar;
      state.User.user_info.username = action.payload.username;
      state.isLoading = false;
    },
    updateUserFailed: (state, action)=>{
      state.isLoading = false;
    },
    userLogoutRequested: (state, action) =>{
      state.isLoading = true;
    },
    userLogoutSuccess: (state, action) =>{
      state.isLoading = false;
      state.User = null;
    },
    addLikedSong:(state, action) => {
      state.User.liked_songs.id.push(action.payload);
    },
    removeLikeSong:(state,action)=>{
      const songIdToRemove = action.payload; // Assuming payload contains the song ID
      if (state.User && state.User.liked_songs && state.User.liked_songs.id) {
        state.User.liked_songs.id = state.User.liked_songs.id.filter(id => id !== songIdToRemove);
      }
    }
  },
});

export const {getLogin, getLoginSuccess, getLoginFailed, updateUserRequest, updateUserSucess, updateUserFailed,addLikedSong,removeLikeSong, userLogoutRequested, userLogoutSuccess} = LoginSlice.actions;

export default LoginSlice.reducer;
