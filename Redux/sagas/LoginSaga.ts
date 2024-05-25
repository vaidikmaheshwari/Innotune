import axios from 'axios';
import {ApiServices} from '../../ApiServices';
import {call, put} from 'redux-saga/effects';
import {getLoginSuccess, updateUserFailed, updateUserSucess, userLogoutSuccess} from '../slices/LoginSlice';
import {ToastAndroid} from 'react-native';
type Initials = {
  email: string;
  password: string;
};

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
  [songId: string]: any; // Assuming liked songs can have various structures
}

interface LikedAlbums {
  [albumId: string]: any; // Assuming liked albums can have various structures
}

interface LikedPlaylists {
  [playlistId: string]: any; // Assuming liked playlists can have various structures
}

interface ResponseObject {
  token: string;
  user_info: UserInfo;
  liked_songs: LikedSongs;
  liked_album: LikedAlbums;
  liked_playlist: LikedPlaylists;
}

const Login = async (initial: Initials) => {
  try {
    console.log(initial);
    const res = await axios.post(ApiServices.LoginService, initial);
    console.log('Ye response hai');

    console.log(res);
    console.log(res.data);
    console.log(res.status);

    return res;
  } catch (error) {
    console.log(error);
  }
};
export function* LoginUser(action: {
  payload: Initials;
}): Generator<any, ResponseObject, any> {
  const user = yield call(Login, action.payload);

  try {
    if (user.status === 200) {
      //   // console.log(user);
      console.log(user);
      yield put(getLoginSuccess(user.data));
    }
  } catch (error) {
    const showToastWithGravityAndOffset = () => {
      ToastAndroid.showWithGravityAndOffset(
        'Failed to Login',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    };
    showToastWithGravityAndOffset();

    console.log(error);
  }
  return user;
}

type updatedUserData = {
  userToken: string,
  name: string,
  image?: string,
}
export function* updateUser(action: {payload: updatedUserData}): any {
  try{
    const config={
    headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization':`Token ${action.payload.userToken}`
        }
    }
    const formData = new FormData();
    formData.append("username", action.payload.name);
    if(action.payload.image){
        const localUri = action.payload.image;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('avatar', { uri: localUri, name: filename, type });
    }
    console.log(formData)
    const response = yield call(()=>axios.put(ApiServices.EditProfileService,formData,config));
    console.log(response.data)
    yield put(updateUserSucess(response.data.data))
    }catch(e){
      console.log(e.message)
      yield put(updateUserFailed("User update failed!"))
    }
}

type userLogoutData = {
  userToken: string,
}
export function* logoutUser(action: {
  payload: userLogoutData;
}): any {
  console.log("Logout initiated.")
  try{
    const config={
    headers:{
        'Authorization':`Token ${action.payload.userToken}`
        }
    }
    const response = yield call(()=>axios.get(ApiServices.LogoutService,config));
    console.log(response.data)
    yield put(userLogoutSuccess(response.data))
    }catch(e){
      console.log(e.message)
    }
}