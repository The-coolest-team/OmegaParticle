import axios from "axios";

//ACTION TYPES
const GET_PRODUCTS = "GET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

//ACTION CREATORS
export const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

//THUNKS
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

export const createdProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: token };
      const { data: newProduct } = await axios.post("/api/products", product, {
        headers,
      });
      dispatch(createProduct(newProduct));
      history.push("/admin");
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletedProduct = (productId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: token };
      const { data: deleted } = await axios.delete(
        `/api/products/${productId}`,
        { headers }
      );
      dispatch(deleteProduct(deleted));
      history.push("/home");
      history.push("/admin");
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatedProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: token };
      const { data: updated } = await axios.put(
        `/api/products/${product.id}`,
        product,
        { headers }
      );
      dispatch(updateProduct(updated));
      history.push("/home");
      history.push(`/admin/${product.id}`);
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

    case CREATE_PRODUCT: {
      return [...state, action.product];
    }

    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);

    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );

    default:
      return state;
  }
}
