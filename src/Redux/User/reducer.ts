import * as types from "./types";
import { Article } from "../../db";
import { User } from "../../interfaces";
import { action, ActionType, createReducer } from "typesafe-actions";

interface UserState {
  isLogin: boolean;
  user: User | null;
  loginErr: string | null;
}
const initialState: UserState = {
  isLogin: false,
  user: null,
  loginErr: null,
};
import * as actions from "./action";
export type UserAction = ActionType<typeof actions>;
const userReducer = createReducer<UserState, UserAction>(
  initialState,
  {
    LOGIN_REQUEST: (state) => ({ ...state, loginErr: null }),
    LOGIN_SUCCESS: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    LOGIN_FAILURE: (state, action) => ({
      ...state,
      loginErr: action.payload,
    }),
  }
);
export default userReducer;
