import * as actionTypes from "../constants/ActionTypes";
import { getScreenSize, toBoolean } from "../utils/helpers";
export interface AppAction {
  type: string;
  payload?: string;
}
export interface AppState {
  isLightMode: boolean;
}

const initialState = {
  isLightMode: toBoolean(localStorage.getItem("isLightMode")),
  screenSize: getScreenSize(),
};

const appReducer = (state: AppState = initialState, action: AppAction) => {
  switch (action.type) {
    case actionTypes.SWITCH_MODE:
      const currentMode = !state.isLightMode;
      localStorage.setItem("isLightMode", currentMode.toString());
      return { ...state, isLightMode: currentMode };
    case actionTypes.CHANGE_SCREEN_SIZE:
      return { ...state, screenSize: action.payload };
    default:
      return state;
  }
};
export default appReducer;
