import { CHANGE_TYPE } from "../constants/ActionTypes";
import { AppThunk } from "../types/ThunkType";
import { startFetchGames } from "./GamesActions";

type QueryType = "genre" | "search";

const changeNewType = (newType: QueryType, key: string) => {
  return {
    type: CHANGE_TYPE,
    payload: {
      type: newType,
      key,
    },
  };
};

export const changeType = (newType: QueryType, key: string): AppThunk => {
  return (dispatch) => {
    dispatch(startFetchGames());
    dispatch(changeNewType(newType, key));
  };
};
