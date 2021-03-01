import * as ActionTypes from "../constants/ActionTypes";
export interface AppAction {
  type: string;
}

export interface AppState {
  isLightMode: boolean;
}

const initialState = {
  isLightMode: true,
};

const reducer = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case ActionTypes.SWITCH_MODE:
      const currentMode = !state.isLightMode;
      return { isLightMode: currentMode };
    default:
      return state;
  }
};
export default reducer;
