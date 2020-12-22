import * as actions from "./action";
// console.log(actions); //?

export type UserActionType =
  | ReturnType<typeof actions.loginReqAction>
  | ReturnType<typeof actions.loginSucAction>
  | ReturnType<typeof actions.loginFailAction>;

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
