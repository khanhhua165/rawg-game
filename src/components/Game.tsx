import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getGames } from "../selectors/GameSelectors";
import { RootState } from "../store";
import { fetchGameIfNeeded } from "../actions/GameActions";
import { connect, ConnectedProps } from "react-redux";
import Spinner from "../svgs/Spinner";
import { getPlatformIcon, metaColor, toDateString } from "../utils/helpers";
import { IconType } from "react-icons";
import { FaRegPlayCircle } from "react-icons/fa";
import { RiHandHeartFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import { Screenshot, SingleGameResponse } from "../types/GameType";
import { Trailer } from "../types/ResponseType";
import TrailerModal from "./TrailerModal";
import Footer from "./Footer";

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
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
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

  if ((games[match.params.slugName] as { error: boolean }).error) {
    return (
      <div className="mx-auto mt-4 text-5xl dark:text-white">
        No Game Available
      </div>
    );
  }
  const game = games[match.params.slugName] as SingleGameResponse & {
    screenshots: Screenshot[];
  } & { trailers: Trailer[] };

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
        to={`/games?tags=${tag.slug}`}
        key={tag.id}
        className="pr-2 text-sm"
      >
        {tag.name}
      </Link>
    );
  });
  const gameImages = game.screenshots.map((screenshot) => {
    return (
      <img
        src={screenshot.image}
        alt={screenshot.id}
        key={screenshot.id}
        className="mb-4 rounded-lg"
      />
    );
  });
  const trailer = game.trailers.length > 0 ? game.trailers[0].data[480] : "";
  const switchShowTrailer = () => {
    setShowTrailer((showTrailer) => !showTrailer);
  };
  return (
    <div className="w-11/12 mx-auto mt-4 text-sm md:text-base">
      <div className="flex flex-col justify-center sm:space-x-6 sm:flex-row">
        <div className="self-start w-full mb-3 sm:w-5/12">
          <img
            alt={game.name}
            src={game.background_image}
            className="mb-2 rounded-lg shadow-md"
          />
          {trailer ? (
            <div
              className="flex items-center justify-center py-1 mb-2 space-x-1 bg-gray-300 border-pink-600 rounded-lg cursor-pointer hover:bg-pink-500 dark:bg-gray-900 dark:border dark:hover:bg-pink-600 dark:text-gray-50"
              onClick={switchShowTrailer}
            >
              <FaRegPlayCircle />
              <div>Game Trailer</div>
            </div>
          ) : null}
          {showTrailer ? (
            <TrailerModal
              source={trailer}
              switchShowTrailer={switchShowTrailer}
            />
          ) : null}
          <div className="flex items-center justify-center py-1 space-x-1 bg-gray-300 border-pink-600 rounded-lg cursor-pointer hover:bg-pink-500 dark:bg-gray-900 dark:border dark:hover:bg-pink-600 dark:text-gray-50">
            <RiHandHeartFill />
            <div>Add To Collection</div>
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-7/12">
          <div className="flex items-center space-x-5">
            {game.released ? (
              <div className="text-white px-1 py-0.5 rounded-lg bg-pink-600">
                {toDateString(game.released)}
              </div>
            ) : null}

            <div className="flex space-x-2 dark:text-white">{platforms}</div>
          </div>
          <div className="mt-2 text-4xl font-bold dark:text-white">
            {game.name}
          </div>
          {alterNames}
          <div
            className={`dark:text-${metaStyle} px-1 py-0.5 self-start text-2xl mt-2 text-center border-${metaStyle} border text-gray-900 rounded-md font-semibold bg-${metaStyle} dark:bg-gray-900`}
          >
            {game.metacritic ? game.metacritic : "no score"}
          </div>
          {genres.length !== 0 ? (
            <div className="flex mt-2 space-x-2">
              <div className="text-gray-600 dark:text-gray-400">Genres:</div>
              <div className="flex flex-wrap">{genres}</div>
            </div>
          ) : null}

          {game.website ? (
            <div className="flex flex-wrap items-center mt-2">
              <div className="mr-2 text-gray-600 dark:text-gray-400">
                Homepage:
              </div>
              <div className="dark:text-gray-50">
                <a href={game.website} target="_blank" rel="noreferrer">
                  {game.website}
                </a>
              </div>
            </div>
          ) : null}
          {game.reddit_url ? (
            <div className="flex flex-wrap items-center mt-2">
              <div className="mr-4 text-gray-600 dark:text-gray-400">
                Subreddit:
              </div>
              <div className="dark:text-gray-50">
                <a href={game.reddit_url} target="_blank" rel="noreferrer">
                  {game.reddit_url}
                </a>
              </div>
            </div>
          ) : null}
          {game.description_raw ? (
            <>
              <div className="mt-2 text-gray-600 dark:text-gray-400">About</div>
              <div
                className={`line-clamp-2 dark:text-gray-50 ${
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
            </>
          ) : null}

          <div className="mt-2 text-gray-600 dark:text-gray-400">Tags</div>
          <div className="flex flex-wrap dark:text-gray-50">{tags}</div>
        </div>
      </div>
      <div className="mt-5 mb-10 masonry masonry-1 sm:masonry-2">
        {gameImages}
      </div>
      <div className="hidden bg-green-400 border-green-400 dark:text-green-400"></div>
      <div className="hidden bg-yellow-400 border-yellow-400 dark:text-yellow-400"></div>
      <div className="hidden bg-blue-400 border-blue-400 dark:text-blue-400"></div>
      <div className="hidden bg-red-500 border-red-500 dark:text-red-500"></div>
      <Footer />
    </div>
  );
};

export default connector(Game);
