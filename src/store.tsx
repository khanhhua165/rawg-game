import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducers/AppReducer";
import gamesReducer from "./reducers/GamesReducer";
import genreReducer from "./reducers/GenreReducer";
import typeReducer from "./reducers/TypeReducer";

const rootReducer = combineReducers({
  genre: genreReducer,
  app: appReducer,
  games: gamesReducer,
  type: typeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
