import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getGames } from "../selectors/GameSelectors";
import { RootState } from "../store";
import { fetchGameIfNeeded } from "../actions/GameActions";
import { connect, ConnectedProps } from "react-redux";
import Spinner from "../svgs/Spinner";
import { getPlatformIcon, metaColor, toDateString } from "../utils/helpers";
import { IconType } from "react-icons";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";

const mapStateToProps = (state: RootState) => ({
  games: getGames(state),
});

const mapDispatchToProps = { fetchGameIfNeeded };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Game: React.FC<
  RouteComponentProps<{ slugName: string }> & PropsFromRedux
> = ({ fetchGameIfNeeded, match, games }) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  useEffect(() => {
    fetchGameIfNeeded(match.params.slugName);
  }, [fetchGameIfNeeded, match.params.slugName]);
  if (!games[match.params.slugName]) {
    return (
      <div className="flex flex-col items-center mt-28">
        <Spinner classItems="w-24 animate-spin dark:text-gray-300" />
        <div className="text-xl italic font-semibold dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }
  const game = games[match.params.slugName];
  let alterNames: JSX.Element;
  if (game.alternative_names.length > 0) {
    alterNames = (
      <div className="italic text-gray-500 dark:text-gray-400">
        {game.alternative_names.join(", ")}
      </div>
    );
  } else {
    alterNames = <></>;
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
  const genres = game.genres.map((genre) => {
    return (
      <Link
        to={`/games?genres=${genre.slug}`}
        key={genre.id}
        className="pr-2 underline dark:text-gray-50"
      >
        {genre.name}
      </Link>
    );
  });
  const handleClick = () => {
    setIsTruncated((oldState) => !oldState);
  };
  const tags = game.tags.map((tag) => {
    return (
      <Link
        to={`games?/tags=${tag.slug}`}
        key={tag.id}
        className="pr-2 text-sm"
      >
        {tag.name}
      </Link>
    );
  });
  return (
    <div className="w-11/12 mx-auto mt-4">
      <div className="flex justify-center space-x-6">
        <img
          alt={game.name}
          src={game.background_image}
          className="self-start w-1/3 rounded-lg shadow-md"
        />
        <div className="flex flex-col w-2/3">
          <div className="flex items-center space-x-5">
            <div className="text-white px-1 py-0.5 rounded-lg bg-pink-600">
              {toDateString(game.released)}
            </div>
            <div className="flex space-x-2 dark:text-white">{platforms}</div>
          </div>
          <div className="mt-2 text-4xl font-bold dark:text-white">
            {game.name}
          </div>
          {alterNames}
          <div
            className={`dark:text-${metaStyle} px-1 py-0.5 self-start text-2xl mt-2 text-center border-${metaStyle} border text-gray-900 rounded-md font-semibold bg-${metaStyle} dark:bg-gray-700`}
          >
            {game.metacritic ? game.metacritic : "no score"}
          </div>
          <div className="flex mt-2 space-x-2">
            <div className="text-gray-600 dark:text-gray-400">Genres:</div>
            <div className="flex flex-wrap">{genres}</div>
          </div>
          <div className="flex mt-2 space-x-2">
            <div className="text-gray-600 dark:text-gray-400">Homepage:</div>
            <div className="dark:text-gray-50">
              <a href={game.website} target="_blank" rel="noreferrer">
                {game.website}
              </a>
            </div>
          </div>
          {game.reddit_url ? (
            <div className="flex items-center mt-2 space-x-3">
              <div className="text-gray-600 dark:text-gray-400">Subreddit:</div>
              <div className="dark:text-gray-50">
                <a href={game.reddit_url} target="_blank" rel="noreferrer">
                  {game.reddit_url}
                </a>
              </div>
            </div>
          ) : null}

          <div className="mt-2 text-gray-600 dark:text-gray-400">About</div>
          <div
            className={`line-clamp-3 dark:text-gray-50 ${
              isTruncated ? "" : "line-clamp-none"
            }`}
          >
            {game.description_raw}
          </div>
          <div
            className="italic text-gray-600 cursor-pointer hover:underline dark:text-gray-400"
            onClick={handleClick}
          >
            {isTruncated ? "read more" : "show less"}
          </div>
          <div className="mt-2 text-gray-600 dark:text-gray-400">Tags</div>
          <div className="flex flex-wrap dark:text-gray-50">{tags}</div>
        </div>
      </div>
    </div>
  );
};

export default connector(Game);
