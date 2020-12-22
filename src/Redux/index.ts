import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import article from "./Article/reducer";
import user from "./User/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Saga";
import sagamiddleware from "../Saga/sagamiddleware";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  article,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
const makeStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(sagamiddleware, sagaMiddleware, createLogger())
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default makeStore;
