//no library
import * as types from "./types";
import { Article } from "../../db";

export const getArticleListRequestAction = () => {
  return {
    type: types.GET_ARTICLE_LIST_REQUEST,
  } as const;
};
export const getArticleListSuccessAction = (articleList: [Article]) => {
  return {
    type: types.GET_ARTICLE_LIST_SUCCESS,
    payload: articleList,
  } as const;
};
export const getArticleListFailureAction = (err: string) => {
  return {
    type: types.GET_ARTICLE_LIST_FAILURE,
    payload: err,
  } as const;
};
