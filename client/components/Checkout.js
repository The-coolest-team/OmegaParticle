import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

//On checkout, it should send the order to redux and backend to update the server.
//More work to be done here

const Checkout = (props) => {
  if (!props.isLoggedIn) {
    return (
      <div>
        Mac, please create an account by clicking Sign up above in order to
        check out
      </div>
    );
  } else {
    let order = JSON.parse(window.localStorage.getItem("cart"));
    let price =
      order.reduce((val, nextVal) => {
        return (val += nextVal.price);
      }, 0) / 100;
    console.log(order);
    return (
      <div>
        <h1>Thank you for your order of </h1>
        {order.map((item) => {
          return (
            <div
              key={item.productId}
              style={{
                display: "flex",
                padding: "25px",
                border: "1px solid",
                borderRadius: "10px",
                marginBottom: "-1px",
              }}
            >
              <div>{item.name}</div>
              <img
                src={item.imageUrl}
                style={{
                  maxHeight: "200px",
                  maxWidth: "200px",
                  marginRight: "25px",
                }}
              />
            </div>
          );
        })}
        <div>Total ${price}</div>
        <h1>it will arrive in a billion years</h1>
      </div>
    );
  }
};
// useEffect(()=> {
//   !props.isLoggedIn
// })

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapState, null)(Checkout);
