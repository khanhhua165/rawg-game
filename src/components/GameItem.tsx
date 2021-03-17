import React from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { GameType } from "../types/GameType";
import { getPlatformIcon, metaColor } from "../utils/helpers";

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
        className="object-cover w-full h-52 rounded-t-2xl"
      />
    );
  } else {
    image = (
      <div className="flex items-end w-full h-32 pl-1 bg-gray-300 dark:bg-gray-800 rounded-t-2xl">
        No Photo Available
      </div>
    );
  }
  let platforms: JSX.Element | JSX.Element[];
  if (!game.parent_platforms) {
    platforms = <></>;
  } else {
    platforms = game.parent_platforms.map((platform) => {
      const Icon = getPlatformIcon(platform.platform.slug) as IconType;
      return (
        <React.Fragment key={platform.platform.id}>
          <Icon className="text-lg" data-tip={platform.platform.name} />
          <ReactTooltip place="bottom" type="dark" effect="solid" />
        </React.Fragment>
      );
    });
  }

  const metaStyle = metaColor(game.metacritic);

  return (
    <Link
      to={`/games/${game.slug}`}
      className="relative flex-col w-full shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl no-break"
    >
      {image}
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="flex space-x-2">{platforms}</div>
        <div
          className={`dark:text-${metaStyle} px-1 py-0.5 flex justify-center items-center border-${metaStyle} border text-gray-900 rounded-md font-semibold bg-${metaStyle} dark:bg-gray-700`}
        >
          {game.metacritic ? game.metacritic : "no score"}
        </div>
      </div>
      <div className="pb-3 pl-3 pr-2 mt-2 text-2xl font-semibold">
        {game.name}
      </div>
    </Link>
  );
};

export default GameItem;
