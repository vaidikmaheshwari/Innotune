import { createSlice } from "@reduxjs/toolkit";

interface genreItem {
    genre: string;
    genre_picture: string;
  };

interface startState {
    isLoading: boolean,
    genreList: genreItem[] | null,
    error: string,
}
const initialState: startState = {
    isLoading: false,
    genreList: null,
    error: '',
}

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers:{
        genreFetchRequested: (state, action)=>{
            
            state.isLoading=true
            state.error= ''
        },
        genreFetchSuccess: (state, action)=>{
            state.isLoading = false
            state.genreList = action.payload
            state.error= ''
        },
        genreFetchFailed: (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {genreFetchRequested, genreFetchSuccess, genreFetchFailed} = genreSlice.actions
export default genreSlice.reducer