import { RootState } from "../store";

export const getIsLoaded = (state: RootState) => state.user.loaded;
export const getUid = (state: RootState) => state.user.user?.uid;
export const getUsername = (state: RootState) => state.user.user?.name;
