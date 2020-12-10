import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { url } from "../db";
import { getArticleListSuccessAction } from "../Redux/Article/action";

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get(url + "/articles").then((response) => {
      dispatch(getArticleListSuccessAction(response.data.articles));
      console.log(response.data.articles);
    });
  }, []);
  return <div></div>;
}
