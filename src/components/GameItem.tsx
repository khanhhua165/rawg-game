import React from "react";

interface GameItemType {
  background: string;
  slug: string;
  name: string;
}

const GameItem: React.FC<GameItemType> = ({ background, name, slug }) => {
  return (
    <div className="flex flex-col pb-10 shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl">
      <img
        src={background}
        alt={slug}
        className="overflow-hidden rounded-t-2xl"
      />
      <div className="pl-3 mt-2 text-2xl">{name}</div>
    </div>
  );
};

export default GameItem;
