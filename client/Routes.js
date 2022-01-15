import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import SignUp from "./components/SignUp";
import GuestCart from "./components/GuestCart";
import Admin from "./components/Admin";
import SingleProductAdmin from "./components/SingleProductAdmin";
import Checkout from "./components/Checkout";

/* COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/cart" component={GuestCart} />
            {/* Added this*/}
            {isAdmin && <Route exact path="/admin" component={Admin} />}
            {isAdmin && (
              <Route
                exact
                path="/admin/:productId"
                component={SingleProductAdmin}
              />
            )}
            <Route exact path="/home/:productId" component={SingleProduct} />
            <Route exact path="/checkout" component={Checkout} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/home" component={Home} />
            <Route path="/cart" component={GuestCart} />
            {/* Added this */}
            <Route exact path="/home/:productId" component={SingleProduct} />
            <Route exact path="/checkout" component={Checkout} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
