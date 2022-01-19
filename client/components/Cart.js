import React, { useEffect } from "react";
import { me, updateCart, checkout } from "../store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Cart = (props) => {
  let localCart = JSON.parse(window.localStorage.getItem("cart"));

  useEffect(() => {
    !props.isLoggedIn && props.loadInitialData();
  }, []);

  useEffect(() => {
    // props.isLoggedIn && props.updateCart(props.userId);
    if (props.isLoggedIn) {
      console.log("Inside of the 2nd useEffect");
      props.updateCart(props.userId);
    }
    localCart = JSON.parse(window.localStorage.getItem("cart"));
  });

  let history = useHistory();

  let handleSubmit = () => {
    if (Array.isArray(localCart) && props.isLoggedIn) {
      props.checkout(props.userId);
      history.push("/checkout");
    } else if (Array.isArray(localCart)) {
      history.push("/checkout");
    } else {
      history.push("/home");
    }
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
      {!localCart || localCart.length === 0 ? (
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
              // ADDED BY JOHN
              fetch("/create-checkout-session", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", // We're sending JSON information
                },
                body: JSON.stringify(localCart), // This is the JSON we are sending
              })
                .then((res) => {
                  if (res.ok) return res.json(); // If successful we want to convert to JSON
                  return res.json().then((json) => Promise.reject(json)); // Taking our JSON response and making sure it actually fails, b/c fetch doesnt fail on its own
                })
                .then(({ url }) => {
                  // This is our JSON response, which will return to us a URL
                  // console.log(url);
                  window.location = url; // Sends user to the URL
                })
                .catch((e) => {
                  console.error(e.error);
                });
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
