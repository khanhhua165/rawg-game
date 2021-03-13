import React from "react";
import { IconType } from "react-icons/lib";
import ReactTooltip from "react-tooltip";
import { GameType } from "../types/GameType";
import { getDate, getPlatformIcon, metaColor } from "../utils/helpers";

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
      <React.Fragment key={platform.platform.id}>
        <Icon className="text-lg" data-tip={platform.platform.name} />
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </React.Fragment>
    );
  });

  const metaStyle = metaColor(game.metacritic);
  const [year, month, day] = getDate(game.released);
  const dateString = new Date(+year, +month, +day).toDateString;

  return (
    <div className="relative flex-col w-full pb-10 mb-4 shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl no-break">
      {image}
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="flex space-x-2">{platforms}</div>
        <div
          className={`dark:text-${metaStyle} px-1 py-0.5 flex justify-center items-center border-${metaStyle} border text-gray-900 rounded-md font-semibold bg-${metaStyle} dark:bg-gray-700`}
        >
          {game.metacritic ? game.metacritic : 0}
        </div>
      </div>
      <div className="pl-3 pr-2 mt-2 text-2xl font-semibold">{game.name}</div>
      {/* <div className="absolute top-24">Release Date: {dateString}</div> */}
    </div>
  );
};

export default GameItem;
