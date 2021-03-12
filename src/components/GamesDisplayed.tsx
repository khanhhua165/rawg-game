import React from "react";
import Spinner from "../svgs/Spinner";
import { GameType } from "../types/GameType";
import GameItem from "./GameItem";

const GamesDisplayed: React.FC<{ games: GameType[] }> = ({ games }) => {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center w-full mt-28">
        <Spinner classItems="w-24 mx-auto animate-spin dark:text-gray-300" />
        <div className="text-xl italic font-semibold dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }
  const result = games.map((game) => (
    <GameItem
      background={game.background_image}
      name={game.name}
      slug={game.slug}
    />
  ));
  return (
    <div className="grid items-start grid-cols-1 gap-3 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {result}
    </div>
  );
};

export default GamesDisplayed;
