import firebaseStore from "../firebase/config";
import firebase from "firebase/app";
import { AppThunk } from "../types/ThunkType";
import { toast } from "react-toastify";

import {
  FETCH_USER_COLLECTION_SUCCESS,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  TOGGLE_COLLECTION,
  TOGGLE_COLLECTION_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from "../constants/ActionTypes";
import { GamesBySlug, User } from "../reducers/UserReducer";
import { GameType, SingleGameResponse } from "../types/GameType";
import { toastOption } from "../utils/helpers";

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

const fetchCollectionSuccess = (collection: GamesBySlug) => ({
  type: FETCH_USER_COLLECTION_SUCCESS,
  payload: { collection },
});

export const startToggleCollection = () => ({
  type: TOGGLE_COLLECTION,
});

const toggleCollectionSuccess = (
  slug: string,
  like: GameType | SingleGameResponse | null
) => ({
  type: TOGGLE_COLLECTION_SUCCESS,
  payload: { slug, like },
});

export const signUp = (
  email: string,
  passwd: string,
  name: string
): AppThunk<Promise<string>> => async (dispatch, getState) => {
  const state = getState();
  const themeMode = state.app.isLightMode;
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
    if (themeMode) {
      toast(`🍉 Welcome ${user.displayName}!`, toastOption("top-center"));
    } else {
      toast.dark(`🍉 Welcome ${user.displayName}!`, toastOption("top-center"));
    }
  });
  return "";
};

export const switchAuthState = (): AppThunk<() => void> => (
  dispatch,
  getState
) => {
  return firebaseStore.auth.onAuthStateChanged((user) => {
    if (user) {
      const currentUser = {
        uid: user.uid,
        photoURL: user.photoURL,
        name: user.displayName!,
      };
      dispatch(loginSuccess(currentUser));
      firebaseStore.firestore
        .collection("collection")
        .doc(user.uid)
        .get()
        .then((result) =>
          dispatch(fetchCollectionSuccess(result.data() as GamesBySlug))
        )
        .catch((e) => console.log(e));
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
  const themeMode = state.app.isLightMode;
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
  if (themeMode) {
    toast("🍉 Profile changed!", toastOption());
  } else {
    toast.dark("🍉 Profile changed!!", toastOption());
  }
};

export const changePassword = (
  oldPass: string,
  newPass: string
): AppThunk<Promise<string>> => async (dispatch, getState) => {
  const state = getState();
  const themeMode = state.app.isLightMode;
  const user = firebaseStore.auth.currentUser;
  const email = user?.email;
  const identity = firebaseStore.EmailAuthProvider.credential(email!, oldPass);
  try {
    const res = await user?.reauthenticateWithCredential(identity);
    if (res) {
      await user?.updatePassword(newPass);
    }
    if (themeMode) {
      toast("🍉 Password changed sucessfully!", toastOption());
    } else {
      toast.dark("🍉 Password changed sucessfully!", toastOption());
    }

    return "";
  } catch (err: unknown) {
    return "Wrong password!!";
  }
};

export const resetPassword = (email: string): AppThunk => (
  dispatch,
  getState
) => {
  const state = getState();
  const themeMode = state.app.isLightMode;
  firebaseStore.auth
    .sendPasswordResetEmail(email)
    .then(() => {
      if (themeMode) {
        toast("🍉 Email sent!", toastOption());
      } else {
        toast.dark("🍉 Email sent!", toastOption());
      }
    })
    .catch((e: unknown) => {
      toast.error("🍉 There is no account with that email!", toastOption());
    });
};

export const toggleCollection = (
  slug: string,
  game: GameType | SingleGameResponse | null
): AppThunk => (dispatch) => {
  const uid = firebaseStore.auth.currentUser!.uid;
  const userCollection = firebaseStore.firestore
    .collection("collection")
    .doc(uid);
  if (!game) {
    userCollection
      .update({ [slug]: firebase.firestore.FieldValue.delete() })
      .then(() => {
        dispatch(toggleCollectionSuccess(slug, game));
      })
      .catch((e: unknown) => {
        console.log(e);
      });
  } else {
    userCollection
      .set({ [slug]: game }, { merge: true })
      .then(() => {
        dispatch(toggleCollectionSuccess(slug, game));
      })
      .catch((e: unknown) => console.log(e));
  }
};
