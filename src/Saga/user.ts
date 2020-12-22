import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
} from "redux-saga/effects";
import { loginAPI } from "../Api/user";
import * as types from "../Redux/User/types";
import * as actions from "../Redux/User/action";
import { storeToken } from "../Jwt/jwt";
import { DEFERRED } from "./sagamiddleware";

interface WrapperLoginAction {
  type: "LOGIN_REQUEST";
  payload: {
    email: string;
    password: string;
  };
  [DEFERRED]?: {
    resolve: () => void;
    reject: () => void;
  };
}
function* loginReq(action: WrapperLoginAction) {
  const { payload, [DEFERRED]: deferred } = action;
  try {
    console.log("saga called");

    const user = yield loginAPI(payload);
    yield put(actions.loginSucAction(user));
    deferred?.resolve();
    storeToken(user.token);
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors
    ) {
      yield put(actions.loginFailAction(error.response.data.errors));
      deferred?.reject();
    } else {
      console.log("server err");
      //서버 err
    }
  }
}
export default function* userSaga() {
  yield all([takeLatest(types.LOGIN_REQUEST, loginReq)]);
}
