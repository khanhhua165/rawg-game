import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getUnfetchedGenres } from "../actions/GamesAction";
import useQuery from "../hooks/QueryHook";
import { getLoading } from "../selectors/GamesByGenreSelectors";
import { RootState } from "../store";
import GamesDisplayed from "./GamesDisplayed";

const mapStateToProps = (state: RootState) => ({
  loading: getLoading(state),
});

const mapDispatchToProps = { getUnfetchedGenres };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Games: React.FC<RouteComponentProps & PropsFromRedux> = (props) => {
  const query = useQuery();
  useEffect(() => {
    getUnfetchedGenres(query.get("genre")!);
  }, [query]);
  if (!props.loading) {
    return <div className="text-pink-400 text-7xl">LOADING</div>;
  }
  return (
    <div className="flex flex-col">
      <GamesDisplayed />
    </div>
  );
};

export default connector(Games);
