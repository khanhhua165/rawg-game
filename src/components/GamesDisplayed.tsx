import React from "react";
import { GameType } from "../types/GameType";
import GameItem from "./GameItem";

const GamesDisplayed: React.FC<{ games: GameType[] }> = ({ games }) => {
  if (games.length === 0) {
    return (
      <div className="mx-auto mt-5 text-2xl font-semibold sm:text-3xl md:text-4xl dark:text-white">
        NO GAMES AVAILABLE
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
