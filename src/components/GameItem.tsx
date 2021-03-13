import React from "react";
import { IconType } from "react-icons/lib";
import ReactTooltip from "react-tooltip";
import { GameType } from "../types/GameType";
import { getPlatformIcon } from "../utils/helpers";

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
  const platforms = game.parent_platforms.map((platform) => {
    const Icon = getPlatformIcon(platform.platform.slug) as IconType;
    return (
      <>
        <Icon
          key={platform.platform.id}
          className="text-lg"
          data-tip={platform.platform.name}
        />
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </>
    );
  });

  return (
    <div className="flex-col w-full pb-10 mb-4 shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl no-break">
      {image}
      <div className="flex pt-4 pl-3 space-x-2">{platforms}</div>
      <div className="pl-3 pr-2 mt-2 text-2xl">{game.name}</div>
    </div>
  );
};

export default GameItem;
