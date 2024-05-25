import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  MusicPlayerReducer,
  LoginReducer,
  GenreReducer,
  MusicPlayerQueueReducer,
  
} from './slices';
// ...
import createSagaMiddleware from 'redux-saga';
import RootSaga from './sagas/watcherFunctons';
const RootReducer = combineReducers({
  musicPlayer: MusicPlayerReducer,
  LoginReducer: LoginReducer,
  GenreReducer: GenreReducer,
  MusicPlayerQueueReducer: MusicPlayerQueueReducer,
  
});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    rootReducer: RootReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(RootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
