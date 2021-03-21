import React, { useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getImageURL, getUsername } from "../selectors/UserSelectors";
import { RootState } from "../store";

const mapStateToProps = (state: RootState) => ({
  username: getUsername(state),
  imageUrl: getImageURL(state),
});

const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ProfileInfoSetting: React.FC<PropsFromRedux> = ({
  username,
  imageUrl,
}) => {
  const [currentImageURL, setCurentImageURL] = useState<string>(
    imageUrl ? imageUrl : ""
  );
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const initialImageURL = useRef<string>(imageUrl ? imageUrl : "");
  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setCurentImageURL(URL.createObjectURL(e.target.files![0]));
    }
  };
  return (
    <div className="flex flex-col items-center mt-4">
      <input
        className="hidden"
        type="file"
        onChange={fileSelectedHandler}
        ref={imageUploadRef}
      />
      {currentImageURL ? (
        <img
          className="object-cover rounded-full w-28 h-28"
          src={currentImageURL}
          alt={username}
        />
      ) : (
        <div className="bg-gray-500 rounded-full w-28 h-28"></div>
      )}
      <div className="mt-3">Username</div>
      <input
        value={username}
        className="py-1 pl-2 mt-1 text-lg border border-pink-500 w-72 rounded-xl dark:bg-gray-800"
      />
      <div className="flex items-center mt-3 space-x-4">
        <button
          className="p-2 bg-pink-600 rounded-xl"
          onClick={() => imageUploadRef.current?.click()}
        >
          Choose Image
        </button>
        <button className="flex justify-start p-2 bg-pink-600 rounded-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default connector(ProfileInfoSetting);
