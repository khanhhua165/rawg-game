import React from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { GameType } from "../types/GameType";
import { getPlatformIcon, metaColor } from "../utils/helpers";
import { RiHandHeartFill } from "react-icons/ri";
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
    <div className="relative flex-col self-stretch w-full shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-white rounded-2xl no-break">
      <Link to={`/games/${game.slug}`}>{image}</Link>
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="flex space-x-2">{platforms}</div>
        <div
          className={`dark:text-${metaStyle} px-1 py-0.5 flex justify-center items-center border-${metaStyle} border text-gray-900 rounded-md font-semibold bg-${metaStyle} dark:bg-gray-700`}
        >
          {game.metacritic ? game.metacritic : "no score"}
        </div>
      </div>
      <div className="flex justify-between w-full pb-3 pl-3 pr-3 mt-3 space-x-3">
        <Link to={`/games/${game.slug}`} className="text-2xl font-semibold">
          {game.name}
        </Link>
        <div className="text-3xl text-gray-400 cursor-pointer hover:text-pink-500">
          <RiHandHeartFill />
        </div>
      </div>
    </div>
  );
};

export default GameItem;
