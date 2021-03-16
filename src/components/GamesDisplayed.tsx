import React from "react";
import Spinner from "../svgs/Spinner";
import { GameType } from "../types/GameType";
import GameItem from "./GameItem";

const GamesDisplayed: React.FC<{ games: GameType[]; isLoading: boolean }> = ({
  games,
  isLoading,
}) => {
  if (games.length === 0) {
    return (
      <div className="mx-auto mt-5 text-2xl font-semibold sm:text-3xl md:text-4xl dark:text-white">
        NO GAMES AVAILABLE
      </div>
    );
  }
  const result = games.map((game) => <GameItem game={game} key={game.id} />);
  return (
    <>
      <div className="grid items-start grid-cols-1 gap-3 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {result}
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center mt-3 mb-6">
          <Spinner classItems="w-24 animate-spin dark:text-gray-300" />
          <div className="text-xl italic font-semibold dark:text-gray-300">
            Loading...
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GamesDisplayed;
