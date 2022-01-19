import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import styles from "./Navbar.modules.css";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <div className={styles.Navbar_container}>Petazon</div>
    <nav>
      {isLoggedIn ? (
        <div className={styles.Navbar_container}>
          {/* The navbar will show these links after you log in */}
          <Link to="/home"></Link>
          <Link to="/cart">Cart</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
