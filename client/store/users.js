import axios from "axios";

const GET_USERS = "GET_USERS";

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      const headers = { Authorization: token };
      const { data } = await axios.get("/api/users", {headers});
      dispatch(getUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default function getUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;

    default:
      return state;
  }
}
