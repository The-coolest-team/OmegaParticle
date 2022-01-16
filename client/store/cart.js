import axios from 'axios'

const UPDATE_CART = "UPDATE_CART"
const CHECKOUT = "CHECKOUT"

const _updateCart = (updatedCart) => ({
  type: UPDATE_CART,
  updatedCart
})

const _checkout = (completedCart) => ({
  type: CHECKOUT,
  completedCart
})

export const updateCart = (userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token")
    const localCart = JSON.parse(window.localStorage.getItem("cart"))
    if (Array.isArray(localCart)) {
      localCart.map((item) => {
        let {productId, quantity} = item
        return {productId, quantity}
      })
      console.log("localCart:", localCart)
      const { data:updatedCart } = await axios.post(`/api/cart/${userId}`, {
        localCart: localCart
      }, {
        headers: {
          authorization: token
        }
      });
      dispatch(_updateCart(updatedCart));
    }
  }
};

export const checkout = (userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token")
    const { data:completedCart } = await axios.put(`/api/cart/${userId}/checkout`, {
      headers: {
        authorization: token
      }
    })
    dispatch(_checkout(completedCart))
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_CART:
      window.localStorage.setItem("cart", JSON.stringify(action.updatedCart))
      console.log("CART IS UPDATED")
      return action.updatedCart
    case CHECKOUT:
      return action.completedCart
    default:
      return state;
  }
}
