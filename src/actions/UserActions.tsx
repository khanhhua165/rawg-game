import firebaseStore from "../firebase/config";
import { AppThunk } from "../types/ThunkType";
import { LOGIN_SUCCESS, SIGNOUT_SUCCESS } from "../constants/ActionTypes";
import { User } from "../reducers/UserReducer";

const loginSuccess = (user: User) => ({
  type: LOGIN_SUCCESS,
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
  const user = await (
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
  console.log("HELLO");
  await firebaseStore.auth.signOut();
};
