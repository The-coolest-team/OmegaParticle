import React from "react";
import { connect } from "react-redux";
import { newUser } from "../store/newUser";

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
      lastName: this.state.lastName
    });
  }

  render() {
    return (
      <div>
        <h3>Welcome to Petazon</h3>
        <form onSubmit={this.handleSubmit}>
          <ul>
            <div>
              <label name="username">username: </label>
              <input
                name="username"
                type="text"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <br/>
            <div>
              <label name="email">email: </label>
              <input
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <br/>
            <div>
              <label name="password">password: </label>
              <input
                name="password"
                type="text"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <br/>
            <div>
              <label name="firstName">first name: </label>
              <input
                name="firstName"
                type="text"
                onChange={this.handleChange}
                value={this.state.firstName}
              />
            </div>
            <br/>
            <div>
              <label name="lastName">last name: </label>
              <input
                name="lastName"
                type="text"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </div>
            <br/>
            {/* <div>
              <label name="date_of_birth">date of birth: </label>
              <input
                name="date_of_birth"
                type="text"
                onChange={this.handleChange}
                value={this.state.date_of_birth}
              />
            </div> */}
          </ul>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(newUser(user)),
});

export default connect(null, mapDispatchToProps)(Signup);
