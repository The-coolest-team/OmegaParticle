import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login } from "./components/AuthForm";
import Home from "./components/Home";
import { me, checkCart } from "./store";
import SingleProduct from "./components/SingleProduct";
import SignUp from "./components/SignUp";
import Admin from "./components/Admin";
import SingleProductAdmin from "./components/SingleProductAdmin";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import AddedToCartPage from "./components/AddedToCartPage";
import IsNotSignedUp from "./components/IsNotSignedUp";

/* COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    console.log("inital data loaded");
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.checkCart(this.props.userId);
    }
  }

  render() {
    const { isAdmin, isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/home/:productId" component={SingleProduct} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/added" component={AddedToCartPage} />
          {!isLoggedIn && (
            <Route exact path="/not-signed-up" component={IsNotSignedUp} />
          )}
          {isAdmin && <Route exact path="/admin" component={Admin} />}
          {isAdmin && (
            <Route
              exact
              path="/admin/:productId"
              component={SingleProductAdmin}
            />
          )}

          <Redirect to="/home" />
        </Switch>
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
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    checkCart(userId) {
      dispatch(checkCart(userId));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
