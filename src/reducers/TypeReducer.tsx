import * as actionTypes from "../constants/ActionTypes";

interface TypeState {
  type: "genre" | "search";
  key: string;
}

interface TypePayload {
  type: "genre" | "search";
  key: string;
}

const initialState = {
  type: "genre",
  key: "action",
};

const typeReducer = (
  state: TypeState = initialState as TypeState,
  action: { type: string; payload: TypePayload }
): TypeState => {
  switch (action.type) {
    case actionTypes.CHANGE_TYPE:
      return { ...state, type: action.payload.type, key: action.payload.key };
    default:
      return state;
  }
};
export default typeReducer;
