import * as actionTypes from "../constants/ActionTypes";
import { toBoolean } from "../utils/helpers";
export interface AppAction {
  type: string;
}
export interface AppState {
  isLightMode: boolean;
}

const initialState = {
  isLightMode: toBoolean(localStorage.getItem("isLightMode")),
};

const appReducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case actionTypes.SWITCH_MODE:
      const currentMode = !state.isLightMode;
      localStorage.setItem("isLightMode", currentMode.toString());
      return { isLightMode: currentMode };
    default:
      return state;
  }
};
export default appReducer;
