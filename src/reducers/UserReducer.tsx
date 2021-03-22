import * as actionTypes from "../constants/ActionTypes";

export interface User {
  uid: string;
  photoURL: string | null;
  name: string;
}
interface UserState {
  user: User | null;
  loaded: boolean;
}
const initialState = {
  user: null,
  loaded: false,
};

interface UserPayload {
  user?: User;
  name?: string;
  photoURL?: string;
}

const userReducer = (
  state: UserState = initialState,
  action: {
    type: string;
    payload?: UserPayload;
  }
): UserState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      return { ...state, user: action.payload!.user!, loaded: true };
    }
    case actionTypes.UPDATE_PROFILE_SUCCESS: {
      return { ...state, user: action.payload!.user! };
    }
    case actionTypes.SIGNOUT_SUCCESS: {
      return { ...state, user: null, loaded: false };
    }
    default:
      return state;
  }
};

export default userReducer;
