import userSaga from "./user";
import { all, fork, takeEvery } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
