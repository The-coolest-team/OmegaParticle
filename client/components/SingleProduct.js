import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";

const SingleProduct = (props) => {
  useEffect(() => {
    props.fetchSingleProduct(props.match.params.productId);
  }, []);

  const { id, name, description, price, imageUrl } = props.product;

  return (
    <div>
      <img src={imageUrl}></img>
      <p>{name}</p>
      <p>${price / 100}</p>
      <p>{description}</p>
      <Link to={"/added"}>
        <button
          onClick={() => {
            addToCart(id, name, description, price, imageUrl);
          }}
        >
          Add to cart
        </button>
      </Link>
    </div>
  );
};

const addToCart = (productId, name, description, price, imageUrl) => {
  let localCartArr = [];
  const localCart = window.localStorage.getItem("cart");
  if (localCart) localCartArr = JSON.parse(localCart);

  let newItem = true;
  localCartArr.forEach((cartitem) => {
    if (cartitem.productId === productId) {
      cartitem.quantity++;
      newItem = false;
    }
  });
  if (newItem)
    localCartArr.push({
      productId,
      name,
      description,
      price,
      quantity: 1,
      imageUrl,
    });
  window.localStorage.setItem("cart", JSON.stringify(localCartArr));
};

const mapStateToProps = (state) => {
  return {
    product: state.singleProductReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (id) => {
      dispatch(fetchSingleProduct(id));
    },
  };
};

const ConnectedSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);

export default ConnectedSingleProduct;
