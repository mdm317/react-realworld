import * as types from "./types";
import { createAsyncAction } from "typesafe-actions";
import { User } from "../../interfaces";

export const loginAction = createAsyncAction(
  types.LOGIN_REQUEST,
  types.LOGIN_SUCCESS,
  types.LOGIN_FAILURE
)<null, User, string>();

const userAction = loginAction;
export default userAction;
