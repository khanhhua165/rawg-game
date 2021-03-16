import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getNextGames, getUnfetchedGames } from "../actions/GamesActions";
import { getGames } from "../selectors/GamesSelectors";
import { RootState } from "../store";
import GamesDisplayed from "./GamesDisplayed";
import Spinner from "../svgs/Spinner";

const mapStateToProps = (state: RootState) => ({
  games: getGames(state),
});

const mapDispatchToProps = { getUnfetchedGames, getNextGames };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Games: React.FC<
  PropsFromRedux & { queryType: string; queryString: string }
> = ({ getUnfetchedGames, games, queryType, queryString, getNextGames }) => {
  useEffect(() => {
    getUnfetchedGames(queryType, queryString);
  }, [getUnfetchedGames, queryString, queryType]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setTimeout(() => {
          getNextGames(queryType, queryString);
        }, 5000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getNextGames, queryString, queryType]);

  if (!games[queryType]?.[queryString]?.games) {
    return (
      <div className="flex flex-col items-center mt-28">
        <Spinner classItems="w-24 animate-spin dark:text-gray-300" />
        <div className="text-xl italic font-semibold dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }
  const gamesDisplayed = [...games[queryType][queryString].games];
  return (
    <div className="flex flex-col">
      <GamesDisplayed games={gamesDisplayed} />
    </div>
  );
};

export default connector(Games);
