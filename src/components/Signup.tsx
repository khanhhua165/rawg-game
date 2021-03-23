import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Redirect, RouteComponentProps } from "react-router";
import { AiOutlineWarning } from "react-icons/ai";
import { signUp } from "../actions/UserActions";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { getIsLoaded } from "../selectors/UserSelectors";

interface SignUpInputs {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoaded: getIsLoaded(state),
  };
};

const mapDispatchToProps = {
  signUp,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Signup: React.FC<RouteComponentProps & PropsFromRedux> = ({
  signUp,
  isLoaded,
}) => {
  const [emailErr, setEmailErr] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    errors,
    formState: { isSubmitting },
  } = useForm<SignUpInputs>();
  const onSubmit: SubmitHandler<SignUpInputs> = async (
    { email, password, name },
    e
  ) => {
    e?.preventDefault();
    const error = await signUp(email, password, name);
    setEmailErr(error);
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
        placeholder="Email"
        ref={register({
          required: "You need to input an email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "You need to input a valid email",
          },
        })}
      />
      {emailErr && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{emailErr}</span>
        </p>
      )}
      {errors.email && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.email.message}</span>
        </p>
      )}
      <input
        className="mt-2 input-style"
        name="name"
        placeholder="Your name or nickname"
        ref={register({
          required: "You need to input a name",
        })}
      />
      {errors.name && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.name.message}</span>
        </p>
      )}
      <input
        className="mt-2 input-style"
        name="password"
        type="password"
        placeholder="Password"
        ref={register({
          required: "You must enter a password",
          minLength: {
            value: 6,
            message: "Password length must be >= 6",
          },
        })}
      />
      {errors.password && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.password.message}</span>
        </p>
      )}
      <input
        className="mt-2 input-style"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        ref={register({
          required: "You must enter a password",
          validate: (value) =>
            value === watch("password") || "The passwords do not match",
        })}
      />
      {errors.confirmPassword && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.confirmPassword.message}</span>
        </p>
      )}
      <input
        disabled={isSubmitting}
        type="submit"
        value="SIGN UP"
        className="py-2 mt-3 bg-pink-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 dark:border-gray-900 hover:bg-pink-700"
      />
      <Link to="/signin" className="mt-1 underline dark:text-gray-50">
        Already have an account? Login.
      </Link>
    </form>
  );
};

export default connector(Signup);
