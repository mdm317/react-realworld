import * as types from "./types";
import { LoginUser, User } from "../../db";
import { DEFERRED } from "../../Saga/sagamiddleware";
export interface AuthError {
  username?: [string];
  email?: [string];
  password?: [string];
  "email or password"?: [string];
}
export const loginReqAction = (
  email: string,
  password: string,
  deffered = false
) =>
  ({
    type: types.LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
    [DEFERRED]: deffered,
  } as const);
export const loginSucAction = (user: LoginUser) =>
  ({
    type: types.LOGIN_SUCCESS,
    payload: user,
  } as const);
export const loginFailAction = (errorMessage: AuthError) =>
  ({
    type: types.LOGIN_FAILURE,
    payload: errorMessage,
  } as const);
