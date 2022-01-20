import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import styles from "./LogIn.modules.css";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className={styles.sign_up_form}>
      <form className={styles.form} onSubmit={handleSubmit} name={name}>
        <div className={styles.parent}>
          <label htmlFor="username">Username</label>
          <input name="username" type="text" className={styles.input_field} />
        </div>
        <div className={styles.parent}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className={styles.input_field}
          />
        </div>
        <div className={styles.align_right}>
          <button className={styles.sign_up_button} type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName, history));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
