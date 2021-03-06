import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
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
      <div
        className="p-2 bg-gray-300 rounded-2xl hover:bg-pink-600 dark:text-white"
        key={genre.id}
      >
        {genre.name}
      </div>
    );
  });

  return (
    <div className="flex flex-wrap items-center space-x-5 space-y-3">
      {genreList}
    </div>
  );
};

export default connector(Header);
