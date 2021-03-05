import { Action, ActionCreator } from "redux";
import { SWITCH_MODE } from "../constants/ActionTypes";
export const switchUI: ActionCreator<Action<string>> = () => ({
  type: SWITCH_MODE,
});
