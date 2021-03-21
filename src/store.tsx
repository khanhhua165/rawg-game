import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducers/AppReducer";
import gamesReducer from "./reducers/GamesReducer";
import genreReducer from "./reducers/GenreReducer";
import gameReducer from "./reducers/SingleGameReducer";
import userReducer from "./reducers/UserReducer";

const rootReducer = combineReducers({
  genre: genreReducer,
  app: appReducer,
  games: gamesReducer,
  game: gameReducer,
  user: userReducer,
});

const composeEnhancers = composeWithDevTools({ trace: true });

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
