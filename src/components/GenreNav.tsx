import React from "react";
import { NavLink } from "react-router-dom";
import { GenreData } from "../actions/GenreActions";
import { changeType } from "../actions/TypeActions";
import { connect, ConnectedProps } from "react-redux";

const mapDispatchToProps = { changeType };

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const GenreNav: React.FC<{ genres: GenreData[] } & PropsFromRedux> = ({
  genres,
  changeType,
}) => {
  const handleClick = (slug: string) => {
    changeType("genre", slug);
  };
  const genreList = genres.map((genre) => {
    return (
      <NavLink
        className="p-2 mt-2 mr-4 text-gray-900 bg-gray-300 rounded-2xl hover:bg-pink-600 dark:bg-gray-700 hover:text-gray-50 dark:hover:bg-pink-600 dark:text-white"
        key={genre.id}
        to={{
          pathname: "/games",
          search: `?genre=${genre.slug}`,
        }}
        isActive={(match, location) => {
          return (
            location.pathname + location.search === `/games?genre=${genre.slug}`
          );
        }}
        onClick={() => handleClick(genre.slug)}
      >
        {genre.name}
      </NavLink>
    );
  });

  return <div className="flex flex-wrap items-center">{genreList}</div>;
};

export default connector(GenreNav);
