import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Searchbar from "./Searchbar";
import UISwitch from "./UISwitch";

const Navbar: React.FC<RouteComponentProps> = (props) => {
  const handleClick = () => {
    props.history.push("/");
  };
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between py-4 mx-auto px-14 max-w-7xl">
        <div className="flex space-x-9 justify-left">
          <div
            className="font-sans text-2xl font-bold tracking-widest uppercase cursor-pointer"
            onClick={handleClick}
          >
            RAWG
          </div>
          <Searchbar />
        </div>
        <div className="flex items-center justify-center space-x-9">
          <UISwitch />
          <div className="w-12 h-12 bg-pink-500"></div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
