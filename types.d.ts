export interface PlaylistResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: Playlist[];
}

interface Playlist {
  id: number;
  playlist_duration: number;
  playlist_name: string;
  playlist_picture: string;
  total_songs: number;
  user_id: number;
}
 interface Song {
   id: number;
   created_at: string;
   album_name: string;
   likes: number;
   comments: number;
   artist_id: number;
   song_name: string;
   song_picture: string;
   song_description: string | null;
   audio: string;
   video: string | null;
   audio_duration: number;
   genre: string;
   lyrics: string | null;
   credits: any; // You may want to define a proper type for credits if needed
 }

interface PlaylistSongsResponse {
  playlist: {
    id: number;
    is_global: boolean;
    playlist_duration: number;
    playlist_name: string;
    playlist_picture: string;
    total_songs: number;
    user_id: number;
  };
  songs: Song[];
}
