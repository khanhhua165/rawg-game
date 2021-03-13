import React from "react";
import { GameType } from "../types/GameType";

interface GameItemType {
  game: GameType;
}

const GameItem: React.FC<GameItemType> = ({ game }) => {
  return (
    <div className="flex-col pb-10 mb-4 shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl no-break">
      <img
        src={game.background_image}
        alt={game.slug}
        className="rounded-t-2xl "
      />
      <div className="pl-3 mt-2 text-2xl ">{game.name}</div>
      <div className="pl-3 mt-2 text-2xl ">{game.clip}</div>
    </div>
  );
};

export default GameItem;
