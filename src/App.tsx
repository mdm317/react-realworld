import React from "react";
import Home from "./Pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";

export default function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
