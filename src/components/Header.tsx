import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllGenres } from "../actions/GenreActions";
import { getGenre, getLoading } from "../selectors/GenreSelectors";
import { RootState } from "../store";
import Spinner from "../svgs/Spinner";

const mapStateToProps = (state: RootState) => ({
  loading: getLoading(state),
  genres: getGenre(state),
});

const mapDispatchToProps = { fetchAllGenres };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Header: React.FC<PropsFromRedux> = ({
  loading,
  genres,
  fetchAllGenres,
}) => {
  useEffect(() => {
    console.log("chay chua");
    fetchAllGenres();
  }, [fetchAllGenres]);
  if (loading) {
    return (
      <div className="flex flex-col items-center w-full mt-28">
        <Spinner classItems="w-24 mx-auto animate-spin" />
        <div className="text-xl italic font-semibold">Loading...</div>
      </div>
    );
  }
  const genreList = genres.map((genre) => {
    return (
      <NavLink key={genre.id} to={`/games?genre=${genre.slug}`}>
        <div className="p-2 mt-2 mr-4 text-gray-900 bg-gray-300 rounded-2xl hover:bg-pink-600 dark:bg-gray-700 hover:text-gray-50 dark:hover:bg-pink-600 dark:text-white">
          {genre.name}
        </div>
      </NavLink>
    );
  });

  return <div className="flex flex-wrap items-center">{genreList}</div>;
};

export default connector(Header);
