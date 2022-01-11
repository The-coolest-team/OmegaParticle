import axios from "axios";

const SET_SINGLEPRODUCT = "SET_SINGLEPRODUCT";

const setSingleProduct = (singleProduct) => ({
  type: SET_SINGLEPRODUCT,
  singleProduct,
});

export const fetchSingleProduct = (id) =>
  async function (dispatch) {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setSingleProduct(data));
  };

export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLEPRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
}
