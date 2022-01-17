import React, { useEffect } from "react";
import { me, updateCart, checkout } from "../store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Cart = (props) => {
  useEffect(() => {
    !props.isLoggedIn && props.loadInitialData();
  }, []);

  useEffect(() => {
    props.isLoggedIn && props.updateCart(props.userId);
  });

  let history = useHistory();

  let localCart = JSON.parse(window.localStorage.getItem("cart"));

  let handleSubmit = () => {
    props.checkout(props.userId);
    history.push("/checkout");
  };

  const removeItemFromCart = (productId) => {
    localCart = localCart.filter((item) => {
      return item.productId !== productId;
    });

    localCart = JSON.stringify(localCart);
    window.localStorage.setItem("cart", localCart);
    history.push("/cart");
  };

  const increaseQty = (productId) => {
    localCart = localCart.map((item) => {
      if (item.productId === productId) {
        item.quantity++;
      }
      return item;
    });

    localCart = JSON.stringify(localCart);
    window.localStorage.setItem("cart", localCart);
    history.push("/cart");
  };

  const decreaseQty = (productId) => {
    localCart = localCart.map((item) => {
      if (item.productId === productId) {
        if (item.quantity === 1) {
          window.alert("Cannot have less than 1 item in your cart");
        } else {
          item.quantity--;
        }
      }
      return item;
    });

    localCart = JSON.stringify(localCart);
    window.localStorage.setItem("cart", localCart);
    history.push("/cart");
  };

  return (
    <div>
      <h1>My Cart</h1>
      {localCart.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        <div>
          {localCart &&
            localCart.map(
              ({ productId, name, description, price, quantity, imageUrl }) => {
                return (
                  <div
                    key={productId}
                    style={{
                      display: "flex",
                      padding: "25px",
                      border: "1px solid",
                      borderRadius: "10px",
                      marginBottom: "-1px",
                    }}
                  >
                    <img
                      src={imageUrl}
                      style={{
                        maxHeight: "200px",
                        maxWidth: "200px",
                        marginRight: "25px",
                      }}
                    />
                    <div>
                      <h3>{name}</h3>
                      <p>
                        {description.length > 250
                          ? description.slice(0, 250)
                          : description}
                        {description.length > 250 && "..."}
                      </p>
                      <p>Price: ${price / 100}</p>
                      <p>Quantity: {quantity}</p>
                      <button
                        onClick={() => {
                          increaseQty(productId);
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          decreaseQty(productId);
                        }}
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          removeItemFromCart(productId);
                        }}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    updateCart(userId) {
      dispatch(updateCart(userId));
    },
    checkout(userId) {
      dispatch(checkout(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);
