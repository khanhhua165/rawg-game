import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router";
import {
  getCollection,
  getImageURL,
  getIsLoaded,
  getUid,
  getUsername,
} from "../selectors/UserSelectors";
import { RootState } from "../store";
import GamesDisplayed from "./GamesDisplayed";
import UserSetting from "./UserSetting";

const mapStateToProps = (state: RootState) => {
  return {
    isLoaded: getIsLoaded(state),
    uid: getUid(state),
    username: getUsername(state),
    imageURL: getImageURL(state),
    collection: getCollection(state),
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const UserProfile: React.FC<
  RouteComponentProps<{ id: string }> & PropsFromRedux
> = ({ isLoaded, username, uid, match, imageURL, collection }) => {
  const [currentTab, setCurrentTab] = useState<string>("likes");
  if (!isLoaded || match.params.id !== uid) {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex flex-col items-center w-11/12 mx-auto mt-12 sm:items-start">
      <div className="flex items-center space-x-4 sm:ml-10">
        {imageURL ? (
          <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600">
            <img
              src={imageURL}
              className="object-cover transform rounded-full w-36 h-36 hover:rotate-6"
              alt={username}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center text-6xl uppercase bg-gray-800 rounded-full w-36 h-36 dark:bg-pink-600 text-gray-50">
            {username?.slice(0, 1)}
          </div>
        )}

        <div className="text-4xl font-semibold dark:text-white">{username}</div>
      </div>
      <div className="flex items-center mt-5 ml-4 space-x-4 sm:ml-10">
        <div
          className={`text-2xl dark:text-gray-50 transition cursor-pointer hover:border-pink-500 border-b-4 border-transparent ${
            currentTab === "likes" && "border-pink-500"
          }`}
          onClick={() => setCurrentTab("likes")}
        >
          Your Collection
        </div>
        <div
          className={`text-2xl dark:text-gray-50 transition cursor-pointer hover:border-pink-500 border-b-4 border-transparent  ${
            currentTab === "settings" && "border-pink-500"
          }`}
          onClick={() => setCurrentTab("settings")}
        >
          Settings
        </div>
      </div>
      {currentTab === "likes" && (
        <GamesDisplayed
          isLoading={false}
          hasNext={false}
          games={Object.values(collection)}
          type="user"
        />
      )}
      {currentTab === "settings" && <UserSetting />}
      <div className="mt-6"></div>
    </div>
  );
};

export default connector(UserProfile);
