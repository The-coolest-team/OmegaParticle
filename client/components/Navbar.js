import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import styles from "./Navbar.modules.css";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav>
    {isLoggedIn ? (
      <div className={styles.Navbar_container}>
        <Link to="/home">
          <img
            src={"https://i.imgur.com/8r7XpEd.png"}
            className={styles.logo}
          />
        </Link>
        <div className={styles.div_Flex}>
          <div className={styles.Navbar_div}>
            <input
              placeholder="Search our amazing array of products"
              className={styles.Navbar_search}
            />
          </div>
          <img
            src={"https://i.imgur.com/9yXTEsc.png"}
            className={styles.Navbar_search_icon}
          />
        </div>
        <div className={styles.div_Flex}>
          <Link to="/cart">
            <img
              src={"https://i.imgur.com/W6dORqn.png"}
              className={styles.Navbar_right_div}
            />
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <img
                src={"https://i.imgur.com/oKFaPlG.png"}
                className={styles.Navbar_right_div}
              />
            </Link>
          )}
          <a href="#" onClick={handleClick}>
            <img
              src="https://i.imgur.com/XyztwDs.png"
              className={styles.Navbar_right_div}
            />
          </a>
        </div>
      </div>
    ) : (
      <div className={styles.Navbar_container}>
        <Link to="/home">
          <img
            src={"https://i.imgur.com/8r7XpEd.png"}
            className={styles.logo}
          />
        </Link>
        <div className={styles.div_Flex}>
          <div className={styles.Navbar_div}>
            <input
              placeholder="Search our amazing array of products"
              className={styles.Navbar_search}
            />
          </div>
          <img
            src={"https://i.imgur.com/9yXTEsc.png"}
            className={styles.Navbar_search_icon}
          />
        </div>
        <div className={styles.div_Flex}>
          <Link to="/login">
            <img
              src={"https://i.imgur.com/KBmLLrT.png"}
              className={styles.Navbar_right_div}
            />
          </Link>
          <Link to="/signup">
            <img
              src={"https://i.imgur.com/Glg87c7.png"}
              className={styles.Navbar_right_div}
            />
          </Link>
          <Link to="/cart">
            <img
              src={"https://i.imgur.com/W6dORqn.png"}
              className={styles.Navbar_right_div}
            />
          </Link>
        </div>
      </div>
    )}
  </nav>
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
