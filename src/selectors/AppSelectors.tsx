import { RootState } from "../store";

export const getIsLightMode = (state: RootState) => state.app.isLightMode;
