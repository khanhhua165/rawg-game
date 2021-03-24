import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import { connect, ConnectedProps } from "react-redux";
import { changePassword } from "../actions/UserActions";

interface PasswordInputs {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
const mapDispatchToProps = { changePassword };
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ProfilePasswordSetting: React.FC<PropsFromRedux> = ({
  changePassword,
}) => {
  const [passErr, setPassErr] = useState<string>("");
  const {
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<PasswordInputs>();
  const onSubmit: SubmitHandler<PasswordInputs> = async (
    { newPassword, oldPassword },
    e
  ) => {
    e?.preventDefault();
    const err = await changePassword(oldPassword, newPassword);
    setPassErr(err);
    if (err === "") {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="mt-2 w-80 input-style"
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          ref={register({
            required: "You must enter a password",
            minLength: {
              value: 6,
              message: "Password length must be >= 6",
            },
          })}
        />
        {passErr && (
          <p className="input-error">
            <AiOutlineWarning />
            <span>{passErr}</span>
          </p>
        )}
        {errors.oldPassword && (
          <p className="input-error">
            <AiOutlineWarning />
            <span>{errors.oldPassword.message}</span>
          </p>
        )}
        <input
          className="mt-2 input-style w-80"
          name="newPassword"
          type="password"
          placeholder="New Password"
          ref={register({
            required: "You must enter a password",
            minLength: {
              value: 6,
              message: "Password length must be >= 6",
            },
          })}
        />
        {errors.newPassword && (
          <p className="input-error">
            <AiOutlineWarning />
            <span>{errors.newPassword.message}</span>
          </p>
        )}
        <input
          className="mt-2 input-style w-80"
          name="newPasswordConfirm"
          type="password"
          placeholder="Confirm New Password"
          ref={register({
            required: "You must enter a password",
            validate: (value) =>
              value === watch("newPassword") || "The passwords do not match",
          })}
        />
        {errors.newPasswordConfirm && (
          <p className="input-error">
            <AiOutlineWarning />
            <span>{errors.newPasswordConfirm.message}</span>
          </p>
        )}
        <button
          className="flex justify-center w-full p-2 mt-3 bg-pink-600 outline-none cursor-pointer rounded-xl hover:bg-pink-700"
          type="submit"
          disabled={isSubmitting}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default connector(ProfilePasswordSetting);
