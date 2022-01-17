import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../store/users";

const AdminUser = () => {
  let users = useSelector((state) => state.getUsersReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h3>USERS: </h3>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <div> {user.username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUser;
