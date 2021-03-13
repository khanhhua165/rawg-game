import React from "react";
import Spinner from "../svgs/Spinner";
import { GameType } from "../types/GameType";
import GameItem from "./GameItem";

const GamesDisplayed: React.FC<{ games: GameType[] }> = ({ games }) => {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center mt-28">
        <Spinner classItems="w-24 animate-spin dark:text-gray-300" />
        <div className="text-xl italic font-semibold dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }
  const result = games.map((game) => <GameItem game={game} key={game.id} />);
  return (
    // <div className="grid items-start grid-cols-1 gap-3 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div className="mt-4 masonry-1 sm:masonry-2 md:masonry-3 lg:masonry-4 masonry">
      {result}
    </div>
  );
};

export default GamesDisplayed;
