import {all, takeLatest} from 'redux-saga/effects';
import {getLogin, updateUserRequest, userLogoutRequested} from '../slices/LoginSlice';
import {TakeableChannel} from 'redux-saga';
import {LoginUser, logoutUser, updateUser} from './LoginSaga';
import { genreFetchRequested } from '../slices/GenreSlice';
import { fetchGenreList } from './GenreSaga';


function* LoginApi() {
  yield takeLatest(
    getLogin.type as unknown as TakeableChannel<unknown>,
    LoginUser,
  );
}
function* UpdateUserApi(){
  yield takeLatest(
    updateUserRequest.type as unknown as TakeableChannel<unknown>,
    updateUser,
  );
}
function* GenreApi() {
  yield takeLatest(
    genreFetchRequested.type as unknown as TakeableChannel<unknown>,
    fetchGenreList,
  );
}
function* LogoutApi() {
  yield takeLatest(
    userLogoutRequested.type as unknown as TakeableChannel<unknown>,
    logoutUser,
  );
}

export default function* RootSaga() {
  yield all([LoginApi(), GenreApi(), UpdateUserApi(), LogoutApi(),]);
}
