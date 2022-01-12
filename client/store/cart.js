import axios from 'axios'

const ADD_TO_CART = "ADD_TO_CART"

const addToCart = (item) => ({
  type: ADD_TO_CART,
  item
})

export const addSingleProduct = (id) =>
  async function (dispatch) {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(addToCart(data));

  };

  export default function singleProductReducer(state = [], action) {
    switch (action.type) {
      case ADD_TO_CART:
        return action.item;
      default:
        return state;
    }
  }
