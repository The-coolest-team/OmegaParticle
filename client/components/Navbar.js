import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import styles from "./Navbar.modules.css";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <div className={styles.Navbar_container}></div>
    <nav>
      {isLoggedIn ? (
        <div className={styles.Navbar_container}>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <img src={"https://i.imgur.com/8r7XpEd.png"} />
          </Link>
          <Link to="/cart">
            <img src={"https://i.imgur.com/W6dORqn.png"} />
          </Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className={styles.Navbar_container}>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">
            <img src={"https://i.imgur.com/8r7XpEd.png"} />
          </Link>
          <Link to="/login">
            <img src={"https://i.imgur.com/KBmLLrT.png"} />
          </Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
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
