import React from "react";
import { GenreData } from "../actions/GenreActions";

const GenreDescription: React.FC<{
  queryType: string;
  queryString: string;
  genres: GenreData[];
}> = ({ queryString, queryType, genres }) => {};

export default GenreDescription;
