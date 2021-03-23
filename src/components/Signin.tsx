import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { AiOutlineWarning } from "react-icons/ai";
import { Link, Redirect } from "react-router-dom";
import { signIn } from "../actions/UserActions";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { getIsLoaded } from "../selectors/UserSelectors";

interface SignInInputs {
  email: string;
  password: string;
}
const mapStateToProps = (state: RootState) => {
  return {
    isLoaded: getIsLoaded(state),
  };
};

const mapDispatchToProps = {
  signIn,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Signin: React.FC<RouteComponentProps & PropsFromRedux> = ({
  signIn,
  isLoaded,
}) => {
  const [signInErr, setSignInEerr] = useState<string>("");
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm<SignInInputs>();
  const onSubmit: SubmitHandler<SignInInputs> = async (
    { email, password },
    e
  ) => {
    e?.preventDefault();
    try {
      await signIn(email, password);
      setSignInEerr("");
    } catch (e: unknown) {
      setSignInEerr("Provided credentials are wrong!");
    }
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
      {errors.email && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{errors.email.message}</span>
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
        disabled={isSubmitting}
        type="submit"
        value="LOGIN"
        className="py-2 mt-3 bg-pink-600 border-2 border-gray-300 rounded-md cursor-pointer text-gray-50 dark:border-gray-900 hover:bg-pink-700"
      />
      {signInErr && (
        <p className="input-error">
          <AiOutlineWarning />
          <span>{signInErr}</span>
        </p>
      )}

      <Link to="/signup" className="mt-1 underline dark:text-gray-50">
        Don't have an account yet? Sign up.
      </Link>
      <Link
        to="/password-recovery"
        className="mt-0.5 underline dark:text-gray-50"
      >
        Forgot your password?
      </Link>
    </form>
  );
};

export default connector(Signin);
