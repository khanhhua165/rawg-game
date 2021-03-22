import firebaseStore from "../firebase/config";
import firebase from "firebase";
import { AppThunk } from "../types/ThunkType";
import {
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from "../constants/ActionTypes";
import { User } from "../reducers/UserReducer";

const loginSuccess = (user: User) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});
const updateSuccess = (user: User) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: { user },
});

const clearUser = () => ({
  type: SIGNOUT_SUCCESS,
});

export const signUp = (
  email: string,
  passwd: string,
  name: string
): AppThunk<Promise<string>> => async (dispatch) => {
  const emailExisted = await firebaseStore.auth.fetchSignInMethodsForEmail(
    email
  );
  if (emailExisted && emailExisted.length > 0) {
    return "Email already used!!";
  }
  const user = (
    await firebaseStore.auth.createUserWithEmailAndPassword(email, passwd)
  ).user;
  user?.updateProfile({ displayName: name }).then(() => {
    dispatch(
      loginSuccess({
        uid: user.uid,
        photoURL: user.photoURL,
        name: user.displayName!,
      })
    );
  });
  return "";
};

export const switchAuthState = (): AppThunk<() => void> => (dispatch) => {
  return firebaseStore.auth.onAuthStateChanged((user) => {
    if (user) {
      const currentUser = {
        uid: user.uid,
        photoURL: user.photoURL,
        name: user.displayName!,
      };
      dispatch(loginSuccess(currentUser));
    } else {
      dispatch(clearUser());
    }
  });
};

export const signOut = (): AppThunk => async (dispatch) => {
  await firebaseStore.auth.signOut();
};
export const signIn = (
  email: string,
  passwd: string
): AppThunk<Promise<firebase.auth.UserCredential>> => async (dispatch) => {
  return firebaseStore.auth.signInWithEmailAndPassword(email, passwd);
};

export const updateProfileData = (
  newName: string,
  imageFile: File | null = null
): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const storage = firebaseStore.storage.ref();
  const { name, uid, photoURL } = state.user.user as User;
  let imageURL: string | null = photoURL;
  if (imageFile) {
    await storage.child(uid!).put(imageFile);
    imageURL = await storage.child(uid!).getDownloadURL();
  }
  const user = firebaseStore.auth.currentUser;
  if (newName !== name) {
    await user?.updateProfile({ displayName: newName, photoURL: imageURL! });
    dispatch(updateSuccess({ uid, name: newName, photoURL: imageURL }));
  }
  if (newName === name && imageURL) {
    await user?.updateProfile({ photoURL: imageURL });
    dispatch(updateSuccess({ name, uid, photoURL: imageURL }));
  }
};
