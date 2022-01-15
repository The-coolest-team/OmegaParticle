import React from "react";
import { Link } from "react-router-dom";

class GuestCart extends React.Component {
  constructor() {
    super();
  }

  render() {
    let cart = [];

    if (!window.localStorage.getItem("cart")) {
      return <div>GO BUY SUTTIN, NOTHING HERE</div>;
    } else {
      cart = JSON.parse(window.localStorage.getItem("cart"));

      return (
        <ul>
          {cart.map((item) => {
            return (
              <div key={item.productId}>
                <div>{item.productName}</div>
                <div>{item.productPrice}</div>
              </div>
            );
          })}
          <Link to={"/home"}>
            <button>BUY MORE ITEMS</button>
          </Link>
          <Link to={"/checkout"}>
            <button>CHECK OUT</button>
          </Link>
        </ul>
      );
    }
  }
}

export default GuestCart;
