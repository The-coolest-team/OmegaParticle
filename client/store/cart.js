import axios from "axios";

const GET_CART = "GET_CART";
const UPDATE_CART = "UPDATE_CART";
const CHECKOUT = "CHECKOUT";
const CHECK_CART = "CHECK_CART";

const _getCart = (cart) => ({
  type: GET_CART,
  cart,
});

const _updateCart = (updatedCart) => ({
  type: UPDATE_CART,
  updatedCart,
});

const _checkout = (completedCart) => ({
  type: CHECKOUT,
  completedCart,
});

const _checkCart = (checkCart) => ({
  type: CHECK_CART,
  checkCart,
});

export const getCart = (userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const headers = { Authorization: token };
    const { data: cart } = await axios.get(`/api/cart/${userId}/checkout`, {
      headers,
    });
    dispatch(_getCart(cart));
  };
};

export const updateCart = (userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    if (Array.isArray(localCart)) {
      localCart.map((item) => {
        let { productId, quantity } = item;
        return { productId, quantity };
      });
      const { data: updatedCart } = await axios.post(
        `/api/cart/${userId}`,
        localCart,
        {
          headers: {
            authorization: token,
          },
        }
      );
      window.localStorage.setItem("cart", JSON.stringify(updateCart));
      dispatch(_updateCart(updatedCart));
    }
  };
};

export const checkout = (userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const headers = { Authorization: token };
    const { data: completedCart } = await axios.put(
      `/api/cart/${userId}/checkout`,
      null,
      { headers }
    );
    dispatch(_checkout(completedCart));
  };
};

export const checkCart = (userId) => {
  return async (dispatch) => {
    console.log("checkCart entered");
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    const token = window.localStorage.getItem("token");
    const headers = { Authorization: token };
    if (localCart) {
      const { data: updatedCart } = await axios.post(
        `/api/cart/${userId}`,
        localCart,
        { headers }
      );
      dispatch(_updateCart(updatedCart));
    } else {
      const { data: checkCart } = await axios.get(`/api/cart/${userId}/cart`, {
        headers,
      });
      dispatch(_checkCart(checkCart));
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      window.localStorage.setItem("cart", JSON.stringify(action.updatedCart));
      console.log("CART IS UPDATED");
      return action.updatedCart;
    case CHECKOUT:
      window.localStorage.setItem("cart", JSON.stringify(action.completedCart));
      return action.completedCart;
    case CHECK_CART:
      if (action.checkCart)
        window.localStorage.setItem("cart", JSON.stringify(action.checkCart));
      return action.checkCart;
    default:
      return state;
  }
};
