import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import {
  getImageURL,
  getIsLoaded,
  getUid,
  getUsername,
} from "../selectors/UserSelectors";
import { RootState } from "../store";
import Searchbar from "./Searchbar";
import UISwitch from "./UISwitch";
import { signOut } from "../actions/UserActions";
import { IoLogOut } from "react-icons/io5";
const mapStateToProps = (state: RootState) => {
  return {
    isLoaded: getIsLoaded(state),
    uid: getUid(state),
    username: getUsername(state),
    imageURL: getImageURL(state),
  };
};

const mapDispatchToProps = {
  signOut,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Navbar: React.FC<PropsFromRedux> = ({
  isLoaded,
  uid,
  username,
  signOut,
  imageURL,
}) => {
  return (
    <div className="w-full bg-pink-600 shadow-md dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between px-4 py-4 mx-auto sm:px-14 max-w-7xl">
        <div className="flex space-x-5 justify-left">
          <Link to="/">
            <div className="font-sans text-2xl font-bold tracking-widest uppercase cursor-pointer">
              LilRAWG
            </div>
          </Link>
          <Searchbar responsive="hidden sm:block" />
        </div>
        <div className="flex items-center justify-center space-x-9">
          <UISwitch />
          <div className="flex items-center space-x-3">
            {isLoaded ? (
              <>
                <Link
                  to={`/user/${uid}`}
                  className="flex items-center space-x-2 font-semibold text-white cursor-pointer"
                  title={username}
                >
                  {imageURL ? (
                    <img
                      src={imageURL}
                      alt={username}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                  ) : (
                    <p className="flex items-center justify-center w-10 h-10 text-2xl uppercase bg-gray-800 rounded-full fitems-center dark:bg-pink-600">
                      <span>{username?.slice(0, 1)}</span>
                    </p>
                  )}

                  <span className="hidden md:block">{username}</span>
                </Link>
                <IoLogOut
                  className="text-4xl font-semibold cursor-pointer"
                  title="Log out"
                  onClick={signOut}
                />
              </>
            ) : (
              <>
                <Link to="/signup" className="font-semibold">
                  Signup
                </Link>
                <Link to="/signin" className="font-semibold">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connector(Navbar);
