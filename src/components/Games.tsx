import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  getNextGames,
  getUnfetchedGames,
  clearIfHaveGames,
} from "../actions/GamesActions";
import { getGames } from "../selectors/GamesSelectors";
import { RootState } from "../store";
import GamesDisplayed from "./GamesDisplayed";
import Spinner from "../svgs/Spinner";
import _ from "lodash";
import ScrollTop from "./ScrollTop";

const mapStateToProps = (state: RootState) => ({
  games: getGames(state),
});

const mapDispatchToProps = {
  getUnfetchedGames,
  getNextGames,
  clearIfHaveGames,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Games: React.FC<
  PropsFromRedux & { queryType: string; queryString: string }
> = ({
  getUnfetchedGames,
  games,
  queryType,
  queryString,
  getNextGames,
  clearIfHaveGames,
}) => {
  useEffect(() => {
    getUnfetchedGames(queryType, queryString);
    return () => {
      clearIfHaveGames(queryType, queryString);
    };
  }, [clearIfHaveGames, getUnfetchedGames, queryString, queryType]);

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        getNextGames(queryType, queryString);
      }
    }, 300);

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
  const { loading, hasNext } = games[queryType][queryString];
  return (
    <>
      <div className="flex flex-col">
        <GamesDisplayed
          games={gamesDisplayed}
          isLoading={loading}
          hasNext={hasNext}
        />
      </div>
      <ScrollTop />
    </>
  );
};

export default connector(Games);
