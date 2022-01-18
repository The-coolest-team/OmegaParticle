import axios from "axios";

const CREATE_USER = "CREATE_USER";

const createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

export const newUser = (user, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/signup", user);
    dispatch(createUser(data));
    window.alert("Account created! Please login")
    history.push("/login")
  } catch (err) {
    console.log(err);
  }
};

export default function createUserReducer(state = [], action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user;

    default:
      return state;
  }
}
