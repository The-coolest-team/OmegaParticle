import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleProductReducer from "./singleProduct";
import products from "./products";
import createUserReducer from './newUser'
import cart from "./cart"
import getUsersReducer from "./users";

const reducer = combineReducers({
  auth,
  singleProductReducer,
  products,
  createUserReducer,
  cart,
  getUsersReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./cart";
export * from "./singleProduct"
export * from "./products"
