import React from "react";
import { Link } from "react-router-dom";

const AddedToCartPage = (props) => {
  return (
    <div>
      <h1>You have successfully added to your cart!</h1>
      <Link to={"/cart"}>
        <button className="added_to_cart_button">Proceed to cart</button>
      </Link>
      <Link to={"/home"}>
        <button className="added_to_cart_button">Continue shopping</button>
      </Link>
    </div>
  );
};

export default AddedToCartPage;
