import React from "react";
import GamesByGenre from "./GamesByGenre";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="px-10 mt-4">
        <Header />
      </div>
      <GamesByGenre />
    </div>
  );
};

export default Layout;
