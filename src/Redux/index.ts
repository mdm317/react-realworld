import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import articleReducer from "./Article/reducer";

const rootReducer = combineReducers({
  articleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
const makeStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(createLogger()))
  );
export default makeStore;
