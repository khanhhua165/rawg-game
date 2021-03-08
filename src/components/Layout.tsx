import React from "react";
import Body from "./Body";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Body />
    </div>
  );
};

export default Layout;
