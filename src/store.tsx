import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducers/AppReducer";
import gameReducer from "./reducers/GameReducer";
import genreReducer from "./reducers/GenreReducer";

const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
  genre: genreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
