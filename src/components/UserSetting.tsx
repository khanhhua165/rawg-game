import React, { useState } from "react";
import ProfileInfoSetting from "./ProfileInfoSetting";
import ProfilePasswordSetting from "./ProfilePasswordSetting";

const UserSetting: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("profile");
  return (
    <div className="flex flex-col items-center mx-auto mt-4 dark:text-gray-50">
      <div className="flex flex-col">
        <div className="flex items-center justify-center space-x-4">
          <div
            className={`sm:text-2xl dark:text-gray-50 transition cursor-pointer hover:border-pink-500 border-b-4 border-transparent ${
              currentTab === "profile" && "border-pink-500"
            }`}
            onClick={() => setCurrentTab("profile")}
          >
            Profile Info
          </div>
          <div
            className={`sm:text-2xl dark:text-gray-50 transition cursor-pointer hover:border-pink-500 border-b-4 border-transparent  ${
              currentTab === "password" && "border-pink-500"
            }`}
            onClick={() => setCurrentTab("password")}
          >
            Change Password
          </div>
        </div>
        {currentTab === "profile" && <ProfileInfoSetting />}
        {currentTab === "password" && <ProfilePasswordSetting />}
      </div>
    </div>
  );
};

export default UserSetting;
