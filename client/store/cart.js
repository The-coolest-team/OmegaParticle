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


  // action.item = {id: 1, name: 'blue collar', price: 14.99}
  // state = []
  export default function singleProductReducer(state = [{id: 1}], action) {
    switch (action.type) {
      case ADD_TO_CART:
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.item.id) {
            state[i].quantity++
            return state
          }
        }
        action.item.quantity = 1;
        return [...state, action.item]
      default:
        return state;
    }
  }
