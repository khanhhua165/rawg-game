import React from "react";
import { GameType } from "../types/GameType";

interface GameItemType {
  game: GameType;
}

const GameItem: React.FC<GameItemType> = ({ game }) => {
  let image: JSX.Element;
  if (game.background_image) {
    image = (
      <img
        src={game.background_image}
        alt={game.slug}
        className="w-full rounded-t-2xl"
      />
    );
  } else {
    image = (
      <div className="flex items-end w-full h-32 pl-1 bg-gray-300 dark:bg-gray-800 rounded-t-2xl">
        No Photo Available
      </div>
    );
  }
  return (
    <div className="flex-col w-full pb-10 mb-4 shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl no-break">
      {image}
      <div className="pl-3 pr-2 mt-2 text-2xl">{game.name}</div>
    </div>
  );
};

export default GameItem;
