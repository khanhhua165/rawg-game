import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducers/AppReducer";
import gamesByGenreReducer from "./reducers/GamesByGenreReducer";
import genreReducer from "./reducers/GenreReducer";

const rootReducer = combineReducers({
  genre: genreReducer,
  app: appReducer,
  gamesByGenre: gamesByGenreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
