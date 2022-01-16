import React, { useEffect } from "react";
import { me, updateCart, checkout } from "../store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Cart = (props) => {

  useEffect(() => {
    !props.isLoggedIn && props.loadInitialData()
  }, [])

  useEffect(() => {
    props.isLoggedIn && props.updateCart(props.userId)
  })

  let history = useHistory()

  const localCart = JSON.parse(window.localStorage.getItem("cart"))

  let handleSubmit = () => {
    props.checkout(props.userId)
    history.push("/checkout")
  }
  return (
    <div>
      <h1>My Cart</h1>
      { localCart &&
        localCart.map(({productId, name, description, price, quantity, imageUrl}) => {
          return (
            <div key={productId} style={{display:"flex", padding:"25px", border:"1px solid", borderRadius:"10px", marginBottom:"-1px"}}>
              <img src={imageUrl} style={{maxHeight:"200px", maxWidth:"200px", marginRight:"25px"}} />
              <div>
              <h3>{name}</h3>
              <p>{description.length > 250 ? description.slice(0,250) : description}{description.length > 250 && "..."}</p>
              <p>Price: ${price/100}</p>
              <p>Quantity: {quantity}</p>
              </div>
            </div>
          )
        })
      }
      <button onClick={() => {handleSubmit()}}>Checkout</button>
  </div>
  )
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    updateCart(userId) {
      dispatch(updateCart(userId))
    },
    checkout(userId) {
      dispatch(checkout(userId))
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);

