import React from "react";

interface GameItemType {
  background: string;
  slug: string;
  name: string;
}

const GameItem: React.FC<GameItemType> = ({ background, name, slug }) => {
  return (
    <div className="flex-col pb-10 mb-3 shadow-xl w-80 bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl no-break">
      <img src={background} alt={slug} className="rounded-t-2xl " />
      <div className="pl-3 mt-2 text-2xl ">{name}</div>
    </div>
  );
};

export default GameItem;
