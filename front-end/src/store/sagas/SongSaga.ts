import { takeLatest, put, call } from "redux-saga/effects";

import {
  fetchSongsFailer,
  fetchSongsStart,
  fetchSongsSuccess,
} from "../slices/songSlices";
import {   FetchSongSuccesResponse, PaginationType, } from "../../interfaces/songTypes";
import { getAllSongsAPI } from "../../api/songAPI";
import { PayloadAction } from "@reduxjs/toolkit";


function* fetchSongsSaga(action: PayloadAction<PaginationType>) {
  try {
   
    const{page,limit}= action.payload
    const response: FetchSongSuccesResponse = yield call(getAllSongsAPI,page,limit);
  
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchSongsFailer(error.message));
    } else {
      yield put(fetchSongsFailer("An unknown error occurred"));
      console.error();
    }
  }
}

export function* watchFetchSongs() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
}

