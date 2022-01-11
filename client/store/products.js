import axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";

export const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_getProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
