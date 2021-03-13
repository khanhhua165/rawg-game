import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getGenre, getLoading } from "../selectors/GenreSelectors";
import { RootState } from "../store";
import { fetchAllGenres } from "../actions/GenreActions";
import Spinner from "../svgs/Spinner";
import GenreNav from "./GenreNav";
import { RouteComponentProps } from "react-router-dom";
import Games from "./Games";
import { getQuery } from "../utils/helpers";
import GenreDescription from "./GenreDescription";

const mapStateToProps = (state: RootState) => ({
  loading: getLoading(state),
  genres: getGenre(state),
});

const mapDispatchToProps = { fetchAllGenres };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Body: React.FC<PropsFromRedux & RouteComponentProps> = ({
  loading,
  genres,
  fetchAllGenres,
  location,
}) => {
  useEffect(() => {
    fetchAllGenres();
  }, [fetchAllGenres]);
  if (loading) {
    return (
      <div className="flex flex-col items-center w-full mt-28">
        <Spinner classItems="w-24 mx-auto animate-spin dark:text-gray-300" />
        <div className="text-xl italic font-semibold dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }
  const [queryType, queryString] = getQuery(location.search);
  return (
    <div className="flex flex-col w-11/12 mx-auto">
      <GenreNav genres={genres} />
      <GenreDescription queryType={queryType} queryString={queryString} />
      <Games queryType={queryType} queryString={queryString} />
    </div>
  );
};

export default connector(Body);
