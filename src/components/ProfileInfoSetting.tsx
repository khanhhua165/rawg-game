import React, { useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import imageCompression from "browser-image-compression";
import { getImageURL, getUsername } from "../selectors/UserSelectors";
import { updateProfileData } from "../actions/UserActions";
import { RootState } from "../store";
import { AiOutlineWarning } from "react-icons/ai";

const mapStateToProps = (state: RootState) => ({
  username: getUsername(state),
  imageUrl: getImageURL(state),
});

const mapDispatchToProps = { updateProfileData };
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ProfileInputs {
  image: FileList | null;
  name: string;
}

const ProfileInfoSetting: React.FC<PropsFromRedux> = ({
  username,
  imageUrl,
  updateProfileData,
}) => {
  const [currentImageURL, setCurentImageURL] = useState<string>(
    imageUrl ? imageUrl : ""
  );
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const initialImageURL = useRef<string>(imageUrl ? imageUrl : "");
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm<ProfileInputs>();
  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setCurentImageURL(URL.createObjectURL(e.target.files![0]));
    }
  };
  const onSubmit: SubmitHandler<ProfileInputs> = async ({ image, name }, e) => {
    e?.preventDefault();
    if (initialImageURL.current !== currentImageURL) {
      const options = {
        maxWidthOrHeight: 300,
      };
      const resizedImage = await imageCompression(
        (image as FileList)[0],
        options
      );
      updateProfileData(name, resizedImage as File);
    } else {
      updateProfileData(name);
    }
  };
  return (
    <div className="flex flex-col items-center mt-4">
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="hidden"
          type="file"
          name="image"
          onChange={fileSelectedHandler}
          ref={(e: HTMLInputElement) => {
            register(e);
            imageUploadRef.current = e;
          }}
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
        <div className="mt-3">Display Name</div>
        <input
          name="name"
          defaultValue={username}
          className="input-style"
          ref={register({ required: "You cannot leave this field empty" })}
        />
        {errors.name && (
          <p className="input-error">
            <AiOutlineWarning />
            <span>{errors.name.message}</span>
          </p>
        )}
        <div className="flex items-center mt-3 space-x-4">
          <button
            className="p-2 bg-pink-600 outline-none rounded-xl hover:bg-pink-700"
            onClick={(e) => {
              e.preventDefault();
              imageUploadRef.current?.click();
            }}
          >
            Choose Image
          </button>
          <input
            className="flex justify-start p-2 bg-pink-600 outline-none cursor-pointer rounded-xl hover:bg-pink-700"
            type="submit"
            value="Save Changes"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default connector(ProfileInfoSetting);
