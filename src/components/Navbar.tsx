import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import UISwitch from "./UISwitch";

const Navbar: React.FC = () => {
  return (
    <div className="w-full bg-pink-600 shadow-md dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between py-4 mx-auto px-14 max-w-7xl">
        <div className="flex space-x-9 justify-left">
          <Link to="/">
            <div className="font-sans text-2xl font-bold tracking-widest uppercase cursor-pointer">
              RAWG
            </div>
          </Link>
          <Searchbar />
        </div>
        <div className="flex items-center justify-center space-x-9">
          <UISwitch />
          <div className="flex space-x-3">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
