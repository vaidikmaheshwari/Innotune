
export const ApiServices = {
  LoginService: process.env.EXPO_PUBLIC_BASE_URL + '/user/nativelogin/',
  LogoutService: process.env.EXPO_PUBLIC_BASE_URL + '/user/logout/',
  RegisterService: process.env.EXPO_PUBLIC_BASE_URL + '/user/register/',
  GlobalPlaylistService:
    process.env.EXPO_PUBLIC_BASE_URL + '/music/playlist/global/',
  MyMusicPlayListService:
    process.env.EXPO_PUBLIC_BASE_URL + '/music/playlist/list/',
  MyMusicPlayListMusicService:
    process.env.EXPO_PUBLIC_BASE_URL + '/music/songs/playlist/',
  SearchService: process.env.EXPO_PUBLIC_BASE_URL + '/music/songs/?song_name=',
  FetchGenreService: process.env.EXPO_PUBLIC_BASE_URL + '/music/genre/',
  EditProfileService: process.env.EXPO_PUBLIC_BASE_URL + '/user/edit/',
  AddColabService: process.env.EXPO_PUBLIC_BASE_URL + '/colab/add/',
  ExploreGenreService:
    process.env.EXPO_PUBLIC_BASE_URL + '/music/explore/genre/',
  CreatePlaylistService:
    process.env.EXPO_PUBLIC_BASE_URL + '/music/router/playlist/',
  FetchMyCreatedPlaylistService:
    process.env.EXPO_PUBLIC_BASE_URL + '/music/router/playlist/',
  LikeSongService: process.env.EXPO_PUBLIC_BASE_URL + '/reach/like/song/',
  GetColabListService: process.env.EXPO_PUBLIC_BASE_URL + '/colab/list/song/',
  GetLikeSongService: process.env.EXPO_PUBLIC_BASE_URL + '/music/songs/liked/',
  GetRecentSongService:
    process.env.EXPO_PUBLIC_BASE_URL + '/music/songs/recents/',
};


