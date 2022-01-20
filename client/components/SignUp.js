import React from "react";
import { connect } from "react-redux";
import { newUser } from "../store/newUser";
import styles from "./SignUp.modules.css";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      // date_of_birth: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.props.createUser({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  }

  render() {
    return (
      <div className={styles.sign_up_form}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h3 className={styles.title}>Welcome to Petazon</h3>

          <ul>
            <div className={styles.parent}>
              <label name="username">Username </label>
              <input
                className={styles.input_field}
                name="username"
                type="text"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <br />
            <div className={styles.parent}>
              <label name="email">Email </label>
              <input
                className={styles.input_field}
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.email}
                required
              />
            </div>
            <br />
            <div className={styles.parent}>
              <label name="password">Password </label>
              <input
                className={styles.input_field}
                name="password"
                type="text"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <br />
            <div className={styles.parent}>
              <label name="firstName">First Name </label>
              <input
                className={styles.input_field}
                name="firstName"
                type="text"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </div>
            <br />
            <div className={styles.parent}>
              <label name="lastName">Last Name </label>
              <input
                className={styles.input_field}
                name="lastName"
                type="text"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </div>
          </ul>
          <div className={styles.align_right}>
            <button className={styles.sign_up_button} type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createUser: (user) => dispatch(newUser(user, history)),
});

export default connect(null, mapDispatchToProps)(Signup);
