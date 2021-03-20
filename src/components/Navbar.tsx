import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import UISwitch from "./UISwitch";

const Navbar: React.FC = () => {
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
          <div className="flex space-x-3">
            <Link to="/signup" className="font-semibold">
              Signup
            </Link>
            <Link to="/signin" className="font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
