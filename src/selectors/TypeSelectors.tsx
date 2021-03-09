import { RootState } from "../store";

export const getType = (state: RootState) => state.type.type;
export const getKey = (state: RootState) => state.type.key;
