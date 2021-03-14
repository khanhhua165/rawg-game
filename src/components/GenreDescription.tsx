import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getDesc } from "../selectors/GenreSelectors";
import { RootState } from "../store";
import { fetchDescIfNeeded } from "../actions/GenreActions";
const mapStateToProps = (state: RootState) => ({
  descriptions: getDesc(state),
});

const mapDispatchToProps = { fetchDescIfNeeded };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const GenreDescription: React.FC<
  {
    queryType: string;
    queryString: string;
  } & PropsFromRedux
> = ({ queryString, queryType, fetchDescIfNeeded, descriptions }) => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  useEffect(() => {
    if (queryType === "genres") {
      fetchDescIfNeeded(queryString);
    }
  }, [fetchDescIfNeeded, queryString, queryType]);
  const handleClick = () => {
    setIsTruncated((oldState) => !oldState);
  };

  if (queryType === "genres" && descriptions[queryString]) {
    return (
      <div className="flex flex-col">
        <div
          className={`mt-4 dark:text-white line-clamp-4 text-lg ${
            isTruncated ? "" : "line-clamp-none"
          }`}
          dangerouslySetInnerHTML={{ __html: descriptions[queryString] }}
        ></div>
        <div
          className="italic text-gray-900 cursor-pointer dark:text-gray-100 hover:underline"
          onClick={handleClick}
        >
          {isTruncated ? "read more" : "show less"}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default connector(GenreDescription);
