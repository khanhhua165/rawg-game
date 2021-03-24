import * as actionTypes from "../constants/ActionTypes";
import { GameType, SingleGameResponse } from "../types/GameType";

export interface User {
  uid: string;
  photoURL: string | null;
  name: string;
}
export interface GamesBySlug {
  [name: string]: GameType | SingleGameResponse;
}
interface UserState {
  user: User | null;
  loaded: boolean;
  togglingCollection: boolean;
  collection: GamesBySlug;
}
const initialState = {
  user: null,
  loaded: false,
  togglingCollection: false,
  collection: {},
};

interface UserPayload {
  user?: User;
  name?: string;
  photoURL?: string;
  collection?: GamesBySlug;
  slug?: string;
  like?: GameType | SingleGameResponse | null;
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
    case actionTypes.TOGGLE_COLLECTION: {
      return { ...state, togglingCollection: true };
    }
    case actionTypes.TOGGLE_COLLECTION_SUCCESS: {
      if (!action.payload!.like!) {
        const oldCollection = { ...state.collection };
        delete oldCollection[action.payload!.slug!];
        return {
          ...state,
          collection: { ...oldCollection },
          togglingCollection: false,
        };
      }
      return {
        ...state,
        togglingCollection: false,
        collection: {
          ...state.collection,
          [action.payload!.slug!]: action.payload!.like!,
        },
      };
    }
    case actionTypes.FETCH_USER_COLLECTION_SUCCESS:
      return { ...state, collection: action.payload!.collection! };
    case actionTypes.SIGNOUT_SUCCESS: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export default userReducer;
