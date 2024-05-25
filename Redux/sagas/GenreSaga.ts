import { genreFetchRequested, genreFetchSuccess, genreFetchFailed } from '../slices/GenreSlice'
import {call, put} from 'redux-saga/effects'
import axios from 'axios'
import { ApiServices } from '../../ApiServices';
type Initials = {
    userToken: string
  };

interface genreItem {
    genre: string,
    genre_picture: string,
  }
interface ResponseObject {
    results: genreItem[]
  }

export function* fetchGenreList(action: {payload: Initials}): any {
    try{
        
        let headersList = {
            "Authorization": "Token " + action.payload, 
           }
           console.log("Header: ",headersList)
           const response = yield call(()=>axios.request({url: ApiServices.FetchGenreService, method: "GET",
           headers: headersList,}))
          console.log(response.data.results)
        
        yield put(genreFetchSuccess(response.data.results))
    }catch(e){
        console.log(e.message)
        yield put(genreFetchFailed("Genre List Not Found!"))
    }
}
