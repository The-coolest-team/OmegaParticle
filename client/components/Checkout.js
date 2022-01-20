import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { getCart } from "../store";
import { Link } from "react-router-dom";
import styles from "./Checkout.modules.css";

//On checkout, it should send the order to redux and backend to update the server.
//More work to be done here

const Checkout = () => {
  let { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) {
      dispatch(getCart(auth.id));
    }
  }, []);

  if (!auth.id) {
    return (
      <div>
        <b>
          Mac, please create an account by clicking Sign up above in order to
          check out
        </b>
      </div>
    );
  } else if (cart.length) {
    console.log("We are inside the else if on line 44");
    let price =
      cart.reduce((val, nextVal) => {
        return (val += nextVal.price * nextVal.quantity);
      }, 0) / 100;
    // console.log(order);
    window.localStorage.removeItem("cart");
    return (
      <div style={{ padding: "25px", width: "70vw" }}>
        <h1>Thank you for your order of </h1>
        {cart.map((item) => {
          return (
            <div key={item.productId} className={styles.products_card}>
              <div>
                <b>{item.name}</b>
              </div>
              <img src={item.imageUrl} className={styles.products_visual} />
            </div>
          );
        })}
        <div>
          <div className={styles.products_button}>Total ${price}</div>
        </div>
        <div className={styles.block}></div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default Checkout;
