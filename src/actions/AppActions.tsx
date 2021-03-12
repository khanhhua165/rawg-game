import { SWITCH_MODE, CHANGE_SCREEN_SIZE } from "../constants/ActionTypes";
export const switchUI = () => ({
  type: SWITCH_MODE,
});

export const changeScreenSize = (size: string) => ({
  type: CHANGE_SCREEN_SIZE,
  payload: size,
});
