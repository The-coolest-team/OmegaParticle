import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/products";
import { Link } from "react-router-dom";

//On checkout, it should send the order to redux and backend to update the server.
//More work to be done here

const Checkout = () => {
  let order = JSON.parse(window.localStorage.getItem("cart"));
  let price =
    order.reduce((val, nextVal) => {
      return (val += nextVal.productPrice);
    }, 0) / 100;
  console.log(order);
  return (
    <div>
      <h1>Thank you for your order of </h1>
      {order.map((item) => {
        return (
          <div key={item.productId}>
            <div>{item.productName}</div>
          </div>
        );
      })}
      <div>Total ${price}</div>
      <h1>it will arrive in a billion years</h1>
    </div>
  );
};

export default Checkout;
