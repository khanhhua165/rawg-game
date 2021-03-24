import { RootState } from "../store";

export const getIsLoaded = (state: RootState) => state.user.loaded;
export const getUid = (state: RootState) => state.user.user?.uid;
export const getUsername = (state: RootState) => state.user.user?.name;
export const getImageURL = (state: RootState) => state.user.user?.photoURL;
export const getCollection = (state: RootState) => state.user.collection;
export const getIsToggling = (state: RootState) =>
  state.user.togglingCollection;
