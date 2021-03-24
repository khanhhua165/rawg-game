import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Redirect, RouteComponentProps } from "react-router";
import { AiOutlineWarning } from "react-icons/ai";
import { resetPassword } from "../actions/UserActions";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { getIsLoaded } from "../selectors/UserSelectors";

interface RecoveryInputs {
  email: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoaded: getIsLoaded(state),
  };
};

const mapDispatchToProps = {
  resetPassword,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const PasswordRecovery: React.FC<RouteComponentProps & PropsFromRedux> = ({
  resetPassword,
  isLoaded,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm<RecoveryInputs>();
  const onSubmit: SubmitHandler<RecoveryInputs> = async ({ email }, e) => {
    e?.preventDefault();
    resetPassword(email);
  };
  if (isLoaded) {
    return <Redirect to="/" />;
  }
  return (
    <form
      className="flex flex-col w-3/4 max-w-md mx-auto mt-20 sm:text-lg dark:text-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="input-style"
        name="email"
        placeholder="Your account email"
        ref={register({
          required: "You need to input an email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "You need to input a valid email",
          },
        })}
      />
      {errors.email && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.email.message}</span>
        </p>
      )}
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex justify-center py-2 mt-3 bg-pink-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 dark:border-gray-900 hover:bg-pink-700"
      >
        Send Recovery Email
      </button>
      <Link to="/signin" className="mt-1 underline dark:text-gray-50">
        Back to Login.
      </Link>
    </form>
  );
};

export default connector(PasswordRecovery);
